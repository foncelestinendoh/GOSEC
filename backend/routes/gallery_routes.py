from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field, ConfigDict
import uuid
import os
import shutil
from pathlib import Path

from database import db
from routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api", tags=["gallery"])

# Create uploads directory
UPLOAD_DIR = Path("/app/uploads/gallery")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Allowed image extensions
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


def get_file_extension(filename: str) -> str:
    """Get file extension from filename"""
    return Path(filename).suffix.lower()


def is_allowed_file(filename: str) -> bool:
    """Check if file extension is allowed"""
    return get_file_extension(filename) in ALLOWED_EXTENSIONS


# Helper to convert Mongo docs to response format
def to_response(doc: dict) -> dict:
    """Convert MongoDB doc, converting _id to string id"""
    if doc is None:
        return None
    result = dict(doc)
    if "_id" in result:
        result["id"] = str(result.pop("_id"))
    return result


# Gallery models
class GalleryItemBase(BaseModel):
    title_en: str
    title_fr: str
    media_key: str = ""
    image_url: str = ""
    order: int = 0


class GalleryItemResponse(GalleryItemBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


class GalleryItemCreate(GalleryItemBase):
    pass


class GalleryItemUpdate(BaseModel):
    title_en: Optional[str] = None
    title_fr: Optional[str] = None
    media_key: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None


# Default gallery items
DEFAULT_GALLERY = [
    {
        "_id": str(uuid.uuid4()),
        "title_en": "Community Soccer Day",
        "title_fr": "Journée de soccer communautaire",
        "media_key": "gallery.soccer1",
        "image_url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
        "order": 1
    },
    {
        "_id": str(uuid.uuid4()),
        "title_en": "Youth Leadership Workshop",
        "title_fr": "Atelier de leadership pour les jeunes",
        "media_key": "gallery.youth1",
        "image_url": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
        "order": 2
    },
    {
        "_id": str(uuid.uuid4()),
        "title_en": "Family Fun Day",
        "title_fr": "Journée amusante en famille",
        "media_key": "gallery.family1",
        "image_url": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
        "order": 3
    },
    {
        "_id": str(uuid.uuid4()),
        "title_en": "Cultural Celebration",
        "title_fr": "Célébration culturelle",
        "media_key": "gallery.culture1",
        "image_url": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        "order": 4
    },
    {
        "_id": str(uuid.uuid4()),
        "title_en": "Summer Tournament",
        "title_fr": "Tournoi d'été",
        "media_key": "gallery.soccer2",
        "image_url": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
        "order": 5
    },
    {
        "_id": str(uuid.uuid4()),
        "title_en": "Community BBQ",
        "title_fr": "BBQ communautaire",
        "media_key": "gallery.community1",
        "image_url": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        "order": 6
    }
]


@router.get("/gallery", response_model=List[GalleryItemResponse])
async def list_gallery():
    """Get all gallery items sorted by order"""
    items = await db.gallery.find().sort("order", 1).to_list(100)
    if not items:
        # Insert default gallery items
        for item in DEFAULT_GALLERY:
            await db.gallery.insert_one(item)
        items = await db.gallery.find().sort("order", 1).to_list(100)
    return [to_response(item) for item in items]


@router.get("/gallery/{gallery_id}", response_model=GalleryItemResponse)
async def get_gallery_item(gallery_id: str):
    """Get a single gallery item by ID"""
    doc = await db.gallery.find_one({"_id": gallery_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return to_response(doc)


@router.post("/gallery", response_model=GalleryItemResponse, dependencies=[Depends(get_current_admin)])
async def create_gallery_item(item: GalleryItemCreate):
    """Create a new gallery item (admin only)"""
    doc = item.model_dump()
    doc["_id"] = str(uuid.uuid4())
    await db.gallery.insert_one(doc)
    return to_response(doc)


@router.put("/gallery/{gallery_id}", response_model=GalleryItemResponse, dependencies=[Depends(get_current_admin)])
async def update_gallery_item(gallery_id: str, item: GalleryItemUpdate):
    """Update an existing gallery item (admin only)"""
    update_data = {k: v for k, v in item.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    res = await db.gallery.update_one({"_id": gallery_id}, {"$set": update_data})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    doc = await db.gallery.find_one({"_id": gallery_id})
    return to_response(doc)


@router.delete("/gallery/{gallery_id}", dependencies=[Depends(get_current_admin)])
async def delete_gallery_item(gallery_id: str):
    """Delete a gallery item (admin only)"""
    # Get the item first to check for uploaded image
    doc = await db.gallery.find_one({"_id": gallery_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    # Delete the uploaded image file if it exists
    if doc.get("image_url", "").startswith("/api/uploads/"):
        filename = doc["image_url"].split("/")[-1]
        file_path = UPLOAD_DIR / filename
        if file_path.exists():
            file_path.unlink()
    
    res = await db.gallery.delete_one({"_id": gallery_id})
    return {"message": "Gallery item deleted"}


# Image upload endpoint
@router.post("/gallery/upload", dependencies=[Depends(get_current_admin)])
async def upload_gallery_image(file: UploadFile = File(...)):
    """Upload an image for gallery (admin only)"""
    
    # Validate file type
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
    
    if not is_allowed_file(file.filename):
        raise HTTPException(
            status_code=400, 
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Generate unique filename
    file_extension = get_file_extension(file.filename)
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save the file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Return the URL path to access the image
    image_url = f"/api/uploads/gallery/{unique_filename}"
    
    return {
        "filename": unique_filename,
        "image_url": image_url,
        "message": "Image uploaded successfully"
    }


# Serve uploaded images
@router.get("/uploads/gallery/{filename}")
async def get_uploaded_image(filename: str):
    """Serve uploaded gallery images"""
    file_path = UPLOAD_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Determine content type
    extension = get_file_extension(filename)
    content_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp"
    }
    content_type = content_types.get(extension, "application/octet-stream")
    
    return FileResponse(file_path, media_type=content_type)


# Create gallery item with image upload in one request
@router.post("/gallery/with-image", response_model=GalleryItemResponse, dependencies=[Depends(get_current_admin)])
async def create_gallery_with_image(
    title_en: str = Form(...),
    title_fr: str = Form(...),
    media_key: str = Form(""),
    order: int = Form(0),
    image: UploadFile = File(None)
):
    """Create a new gallery item with optional image upload (admin only)"""
    
    image_url = ""
    
    # Handle image upload if provided
    if image and image.filename:
        if not is_allowed_file(image.filename):
            raise HTTPException(
                status_code=400, 
                detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            )
        
        file_extension = get_file_extension(image.filename)
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            image_url = f"/api/uploads/gallery/{unique_filename}"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
    
    # Create gallery item
    doc = {
        "_id": str(uuid.uuid4()),
        "title_en": title_en,
        "title_fr": title_fr,
        "media_key": media_key,
        "image_url": image_url,
        "order": order
    }
    
    await db.gallery.insert_one(doc)
    return to_response(doc)


# Update gallery item with image upload
@router.put("/gallery/{gallery_id}/with-image", response_model=GalleryItemResponse, dependencies=[Depends(get_current_admin)])
async def update_gallery_with_image(
    gallery_id: str,
    title_en: str = Form(None),
    title_fr: str = Form(None),
    media_key: str = Form(None),
    order: int = Form(None),
    image: UploadFile = File(None)
):
    """Update gallery item with optional new image upload (admin only)"""
    
    # Check if item exists
    doc = await db.gallery.find_one({"_id": gallery_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    update_data = {}
    
    # Add form fields if provided
    if title_en is not None:
        update_data["title_en"] = title_en
    if title_fr is not None:
        update_data["title_fr"] = title_fr
    if media_key is not None:
        update_data["media_key"] = media_key
    if order is not None:
        update_data["order"] = order
    
    # Handle image upload if provided
    if image and image.filename:
        if not is_allowed_file(image.filename):
            raise HTTPException(
                status_code=400, 
                detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            )
        
        # Delete old uploaded image if exists
        old_url = doc.get("image_url", "")
        if old_url.startswith("/api/uploads/"):
            old_filename = old_url.split("/")[-1]
            old_path = UPLOAD_DIR / old_filename
            if old_path.exists():
                old_path.unlink()
        
        # Save new image
        file_extension = get_file_extension(image.filename)
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            update_data["image_url"] = f"/api/uploads/gallery/{unique_filename}"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    await db.gallery.update_one({"_id": gallery_id}, {"$set": update_data})
    doc = await db.gallery.find_one({"_id": gallery_id})
    return to_response(doc)
