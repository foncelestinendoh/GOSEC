from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, ConfigDict
import uuid

from database import db
from routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api", tags=["programs"])


# Helper to convert Mongo docs to response format
def to_response(doc: dict) -> dict:
    """Convert MongoDB doc, converting _id to string id"""
    if doc is None:
        return None
    result = dict(doc)
    if "_id" in result:
        result["id"] = str(result.pop("_id"))
    return result


# Program models
class ProgramBase(BaseModel):
    title_en: str
    title_fr: str
    description_en: str
    description_fr: str
    bullets_en: List[str] = []
    bullets_fr: List[str] = []
    media_key: str = ""
    order: int = 0


class ProgramResponse(ProgramBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


class ProgramCreate(ProgramBase):
    pass


class ProgramUpdate(BaseModel):
    title_en: Optional[str] = None
    title_fr: Optional[str] = None
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    bullets_en: Optional[List[str]] = None
    bullets_fr: Optional[List[str]] = None
    media_key: Optional[str] = None
    order: Optional[int] = None


# Default programs data
DEFAULT_PROGRAMS = [
    {
        "_id": "youth",
        "title_en": "Youth Development",
        "title_fr": "Développement des jeunes",
        "description_en": "Programs designed to help young people develop leadership skills, build confidence, and achieve their potential through sports and mentorship.",
        "description_fr": "Programmes conçus pour aider les jeunes à développer des compétences en leadership, à renforcer leur confiance et à atteindre leur potentiel grâce au sport et au mentorat.",
        "bullets_en": ["Leadership training", "Academic support", "Sports activities", "Community service"],
        "bullets_fr": ["Formation au leadership", "Soutien scolaire", "Activités sportives", "Service communautaire"],
        "media_key": "programs.youth",
        "order": 1
    },
    {
        "_id": "family",
        "title_en": "Family Programs",
        "title_fr": "Programmes familiaux",
        "description_en": "Engaging activities that bring families together, strengthen bonds, and create lasting memories while promoting health and wellness.",
        "description_fr": "Activités engageantes qui rassemblent les familles, renforcent les liens et créent des souvenirs durables tout en promouvant la santé et le bien-être.",
        "bullets_en": ["Family fitness classes", "Parent-child activities", "Community events", "Workshops"],
        "bullets_fr": ["Cours de fitness en famille", "Activités parent-enfant", "Événements communautaires", "Ateliers"],
        "media_key": "programs.family",
        "order": 2
    },
    {
        "_id": "culture",
        "title_en": "Cultural Integration",
        "title_fr": "Intégration culturelle",
        "description_en": "Celebrating diversity through cultural events, language support, and community gatherings that help newcomers feel welcome.",
        "description_fr": "Célébrer la diversité à travers des événements culturels, un soutien linguistique et des rassemblements communautaires qui aident les nouveaux arrivants à se sentir bienvenus.",
        "bullets_en": ["Cultural celebrations", "Language support", "Newcomer orientation", "Community connections"],
        "bullets_fr": ["Célébrations culturelles", "Soutien linguistique", "Orientation des nouveaux arrivants", "Connexions communautaires"],
        "media_key": "programs.culture",
        "order": 3
    },
    {
        "_id": "careers",
        "title_en": "Career Development",
        "title_fr": "Développement de carrière",
        "description_en": "Professional development programs including job readiness training, resume workshops, and networking opportunities.",
        "description_fr": "Programmes de développement professionnel incluant la formation à l'emploi, des ateliers de CV et des opportunités de réseautage.",
        "bullets_en": ["Job readiness training", "Resume workshops", "Interview preparation", "Networking events"],
        "bullets_fr": ["Formation à l'emploi", "Ateliers de CV", "Préparation aux entretiens", "Événements de réseautage"],
        "media_key": "programs.careers",
        "order": 4
    },
    {
        "_id": "soccer",
        "title_en": "Recreational Soccer",
        "title_fr": "Soccer récréatif",
        "description_en": "Community-based soccer programs for all ages and skill levels, promoting fitness, teamwork, and fun in a welcoming environment.",
        "description_fr": "Programmes de soccer communautaires pour tous les âges et niveaux de compétence, promouvant la forme physique, le travail d'équipe et le plaisir dans un environnement accueillant.",
        "bullets_en": ["Youth leagues", "Adult leagues", "Skills clinics", "Tournament play"],
        "bullets_fr": ["Ligues jeunesse", "Ligues adultes", "Cliniques de compétences", "Tournois"],
        "media_key": "programs.soccer",
        "order": 5
    }
]


@router.get("/programs", response_model=List[ProgramResponse])
async def list_programs():
    """Get all programs sorted by order"""
    items = await db.programs.find().sort("order", 1).to_list(100)
    if not items:
        # Insert default programs
        for prog in DEFAULT_PROGRAMS:
            await db.programs.insert_one(prog)
        items = await db.programs.find().sort("order", 1).to_list(100)
    return [to_response(item) for item in items]


@router.get("/programs/{program_id}", response_model=ProgramResponse)
async def get_program(program_id: str):
    """Get a single program by ID"""
    doc = await db.programs.find_one({"_id": program_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Program not found")
    return to_response(doc)


@router.post("/programs", response_model=ProgramResponse, dependencies=[Depends(get_current_admin)])
async def create_program(program: ProgramCreate):
    """Create a new program (admin only)"""
    doc = program.model_dump()
    doc["_id"] = str(uuid.uuid4())
    await db.programs.insert_one(doc)
    return to_response(doc)


@router.put("/programs/{program_id}", response_model=ProgramResponse, dependencies=[Depends(get_current_admin)])
async def update_program(program_id: str, program: ProgramUpdate):
    """Update an existing program (admin only)"""
    update_data = {k: v for k, v in program.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    res = await db.programs.update_one({"_id": program_id}, {"$set": update_data})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")
    
    doc = await db.programs.find_one({"_id": program_id})
    return to_response(doc)


@router.delete("/programs/{program_id}", dependencies=[Depends(get_current_admin)])
async def delete_program(program_id: str):
    """Delete a program (admin only)"""
    res = await db.programs.delete_one({"_id": program_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")
    return {"message": "Program deleted"}
