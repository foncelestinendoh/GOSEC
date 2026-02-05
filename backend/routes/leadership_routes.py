from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field, ConfigDict
import uuid
import shutil
from pathlib import Path

from database import db
from routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api", tags=["leadership"])

# Create uploads directory
UPLOAD_DIR = Path("/app/uploads/leadership")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Allowed image extensions
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


def get_file_extension(filename: str) -> str:
    return Path(filename).suffix.lower()


def is_allowed_file(filename: str) -> bool:
    return get_file_extension(filename) in ALLOWED_EXTENSIONS


def to_response(doc: dict) -> dict:
    if doc is None:
        return None
    result = dict(doc)
    if "_id" in result:
        result["id"] = str(result.pop("_id"))
    return result


# Leadership models
class LeadershipMemberBase(BaseModel):
    name: str
    role_en: str
    role_fr: str
    bio_en: str = ""
    bio_fr: str = ""
    email: str = ""
    linkedin: str = ""
    image_url: str = ""
    order: int = 0


class LeadershipMemberResponse(LeadershipMemberBase):
    id: str
    model_config = ConfigDict(from_attributes=True)


class LeadershipMemberCreate(LeadershipMemberBase):
    pass


class LeadershipMemberUpdate(BaseModel):
    name: Optional[str] = None
    role_en: Optional[str] = None
    role_fr: Optional[str] = None
    bio_en: Optional[str] = None
    bio_fr: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None


# Default leadership team members
DEFAULT_LEADERSHIP = [
    {
        "_id": str(uuid.uuid4()),
        "name": "Jean-Pierre Mbeki",
        "role_en": "Founder & President",
        "role_fr": "Fondateur et Président",
        "bio_en": "Jean-Pierre founded GOSEC with a vision to unite communities through sports and culture. With over 15 years of community leadership experience, he has dedicated his life to empowering youth and families in Gatineau-Ottawa.",
        "bio_fr": "Jean-Pierre a fondé GOSEC avec la vision d'unir les communautés par le sport et la culture. Avec plus de 15 ans d'expérience en leadership communautaire, il a consacré sa vie à l'autonomisation des jeunes et des familles à Gatineau-Ottawa.",
        "email": "president@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        "order": 1
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Aminata Diallo",
        "role_en": "Vice President",
        "role_fr": "Vice-Présidente",
        "bio_en": "Aminata brings extensive experience in nonprofit management and community development. She oversees program development and strategic partnerships.",
        "bio_fr": "Aminata apporte une vaste expérience en gestion d'organismes à but non lucratif et en développement communautaire. Elle supervise le développement des programmes et les partenariats stratégiques.",
        "email": "vp@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
        "order": 2
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Emmanuel Okonkwo",
        "role_en": "Director of Soccer Programs",
        "role_fr": "Directeur des programmes de soccer",
        "bio_en": "Emmanuel is a former professional soccer player who now dedicates his expertise to developing youth athletes. He manages all recreational and competitive soccer programs.",
        "bio_fr": "Emmanuel est un ancien joueur de soccer professionnel qui consacre maintenant son expertise au développement des jeunes athlètes. Il gère tous les programmes de soccer récréatifs et compétitifs.",
        "email": "soccer@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        "order": 3
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Marie-Claire Beaumont",
        "role_en": "Director of Youth Development",
        "role_fr": "Directrice du développement des jeunes",
        "bio_en": "Marie-Claire leads our youth leadership and mentorship programs. With a background in education and social work, she creates impactful programs for young people.",
        "bio_fr": "Marie-Claire dirige nos programmes de leadership et de mentorat pour les jeunes. Avec une formation en éducation et en travail social, elle crée des programmes percutants pour les jeunes.",
        "email": "youth@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
        "order": 4
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "David Ndongo",
        "role_en": "Director of Cultural Programs",
        "role_fr": "Directeur des programmes culturels",
        "bio_en": "David oversees cultural integration initiatives and community events. He is passionate about celebrating diversity and helping newcomers feel welcome.",
        "bio_fr": "David supervise les initiatives d'intégration culturelle et les événements communautaires. Il est passionné par la célébration de la diversité et par l'accueil des nouveaux arrivants.",
        "email": "culture@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
        "order": 5
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Fatou Sow",
        "role_en": "Director of Family Programs",
        "role_fr": "Directrice des programmes familiaux",
        "bio_en": "Fatou coordinates family-oriented activities and wellness programs. She believes in strengthening community bonds through family engagement.",
        "bio_fr": "Fatou coordonne les activités familiales et les programmes de bien-être. Elle croit au renforcement des liens communautaires par l'engagement familial.",
        "email": "family@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
        "order": 6
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Michel Tremblay",
        "role_en": "Treasurer",
        "role_fr": "Trésorier",
        "bio_en": "Michel manages GOSEC's finances and fundraising initiatives. His expertise in financial management ensures the organization's sustainability.",
        "bio_fr": "Michel gère les finances de GOSEC et les initiatives de collecte de fonds. Son expertise en gestion financière assure la pérennité de l'organisation.",
        "email": "treasurer@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
        "order": 7
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Aisha Mohammed",
        "role_en": "Secretary & Communications",
        "role_fr": "Secrétaire et Communications",
        "bio_en": "Aisha handles organizational communications, media relations, and community outreach. She ensures GOSEC's message reaches all corners of the community.",
        "bio_fr": "Aisha gère les communications organisationnelles, les relations avec les médias et la sensibilisation communautaire. Elle s'assure que le message de GOSEC atteint tous les coins de la communauté.",
        "email": "communications@gosec.ca",
        "linkedin": "",
        "image_url": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
        "order": 8
    }
]


@router.get("/leadership", response_model=List[LeadershipMemberResponse])
async def list_leadership():
    """Get all leadership team members sorted by order"""
    items = await db.leadership.find().sort("order", 1).to_list(100)
    if not items:
        for member in DEFAULT_LEADERSHIP:
            await db.leadership.insert_one(member)
        items = await db.leadership.find().sort("order", 1).to_list(100)
    return [to_response(item) for item in items]


@router.get("/leadership/{member_id}", response_model=LeadershipMemberResponse)
async def get_leadership_member(member_id: str):
    """Get a single leadership member by ID"""
    doc = await db.leadership.find_one({"_id": member_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Leadership member not found")
    return to_response(doc)


@router.post("/leadership", response_model=LeadershipMemberResponse, dependencies=[Depends(get_current_admin)])
async def create_leadership_member(member: LeadershipMemberCreate):
    """Create a new leadership member (admin only)"""
    doc = member.model_dump()
    doc["_id"] = str(uuid.uuid4())
    await db.leadership.insert_one(doc)
    return to_response(doc)


@router.put("/leadership/{member_id}", response_model=LeadershipMemberResponse, dependencies=[Depends(get_current_admin)])
async def update_leadership_member(member_id: str, member: LeadershipMemberUpdate):
    """Update an existing leadership member (admin only)"""
    update_data = {k: v for k, v in member.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    res = await db.leadership.update_one({"_id": member_id}, {"$set": update_data})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Leadership member not found")
    
    doc = await db.leadership.find_one({"_id": member_id})
    return to_response(doc)


@router.delete("/leadership/{member_id}", dependencies=[Depends(get_current_admin)])
async def delete_leadership_member(member_id: str):
    """Delete a leadership member (admin only)"""
    doc = await db.leadership.find_one({"_id": member_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Leadership member not found")
    
    # Delete uploaded image if exists
    if doc.get("image_url", "").startswith("/api/uploads/"):
        filename = doc["image_url"].split("/")[-1]
        file_path = UPLOAD_DIR / filename
        if file_path.exists():
            file_path.unlink()
    
    await db.leadership.delete_one({"_id": member_id})
    return {"message": "Leadership member deleted"}


# Image upload endpoint
@router.post("/leadership/upload", dependencies=[Depends(get_current_admin)])
async def upload_leadership_image(file: UploadFile = File(...)):
    """Upload a photo for leadership team (admin only)"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
    
    if not is_allowed_file(file.filename):
        raise HTTPException(
            status_code=400, 
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    file_extension = get_file_extension(file.filename)
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    image_url = f"/api/uploads/leadership/{unique_filename}"
    return {"filename": unique_filename, "image_url": image_url, "message": "Image uploaded successfully"}


# Serve uploaded images
@router.get("/uploads/leadership/{filename}")
async def get_uploaded_leadership_image(filename: str):
    """Serve uploaded leadership photos"""
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")
    
    extension = get_file_extension(filename)
    content_types = {
        ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".png": "image/png", ".gif": "image/gif", ".webp": "image/webp"
    }
    return FileResponse(file_path, media_type=content_types.get(extension, "application/octet-stream"))


# Create leadership member with image upload
@router.post("/leadership/with-image", response_model=LeadershipMemberResponse, dependencies=[Depends(get_current_admin)])
async def create_leadership_with_image(
    name: str = Form(...),
    role_en: str = Form(...),
    role_fr: str = Form(...),
    bio_en: str = Form(""),
    bio_fr: str = Form(""),
    email: str = Form(""),
    linkedin: str = Form(""),
    order: int = Form(0),
    image: UploadFile = File(None)
):
    """Create a new leadership member with optional image upload (admin only)"""
    image_url = ""
    
    if image and image.filename:
        if not is_allowed_file(image.filename):
            raise HTTPException(status_code=400, detail=f"File type not allowed")
        
        file_extension = get_file_extension(image.filename)
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            image_url = f"/api/uploads/leadership/{unique_filename}"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
    
    doc = {
        "_id": str(uuid.uuid4()),
        "name": name,
        "role_en": role_en,
        "role_fr": role_fr,
        "bio_en": bio_en,
        "bio_fr": bio_fr,
        "email": email,
        "linkedin": linkedin,
        "image_url": image_url,
        "order": order
    }
    
    await db.leadership.insert_one(doc)
    return to_response(doc)


# Update leadership member with image upload
@router.put("/leadership/{member_id}/with-image", response_model=LeadershipMemberResponse, dependencies=[Depends(get_current_admin)])
async def update_leadership_with_image(
    member_id: str,
    name: str = Form(None),
    role_en: str = Form(None),
    role_fr: str = Form(None),
    bio_en: str = Form(None),
    bio_fr: str = Form(None),
    email: str = Form(None),
    linkedin: str = Form(None),
    order: int = Form(None),
    image: UploadFile = File(None)
):
    """Update leadership member with optional new image upload (admin only)"""
    doc = await db.leadership.find_one({"_id": member_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Leadership member not found")
    
    update_data = {}
    if name is not None: update_data["name"] = name
    if role_en is not None: update_data["role_en"] = role_en
    if role_fr is not None: update_data["role_fr"] = role_fr
    if bio_en is not None: update_data["bio_en"] = bio_en
    if bio_fr is not None: update_data["bio_fr"] = bio_fr
    if email is not None: update_data["email"] = email
    if linkedin is not None: update_data["linkedin"] = linkedin
    if order is not None: update_data["order"] = order
    
    if image and image.filename:
        if not is_allowed_file(image.filename):
            raise HTTPException(status_code=400, detail=f"File type not allowed")
        
        # Delete old image
        old_url = doc.get("image_url", "")
        if old_url.startswith("/api/uploads/"):
            old_filename = old_url.split("/")[-1]
            old_path = UPLOAD_DIR / old_filename
            if old_path.exists():
                old_path.unlink()
        
        file_extension = get_file_extension(image.filename)
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            update_data["image_url"] = f"/api/uploads/leadership/{unique_filename}"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    await db.leadership.update_one({"_id": member_id}, {"$set": update_data})
    doc = await db.leadership.find_one({"_id": member_id})
    return to_response(doc)
