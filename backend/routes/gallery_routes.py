from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, ConfigDict
import uuid

from database import db
from routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api", tags=["gallery"])


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
    media_key: str
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
    res = await db.gallery.delete_one({"_id": gallery_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return {"message": "Gallery item deleted"}
