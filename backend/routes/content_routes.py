from typing import List, Optional, Any
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
import uuid

from database import db
from routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api", tags=["content"])


# Helper to convert Mongo docs to response format
def to_response(doc: dict) -> dict:
    """Convert MongoDB doc, converting _id to string id"""
    if doc is None:
        return None
    result = dict(doc)
    if "_id" in result:
        result["id"] = str(result.pop("_id"))
    return result


# Media
class MediaAssetBase(BaseModel):
    key: str
    url: str
    alt_en: Optional[str] = ""
    alt_fr: Optional[str] = ""


class MediaAssetResponse(MediaAssetBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


@router.get("/media", response_model=List[MediaAssetResponse])
async def list_media():
    items = await db.media_assets.find().to_list(200)
    return [to_response(item) for item in items]


@router.post("/media", response_model=MediaAssetResponse, dependencies=[Depends(get_current_admin)])
async def create_media(asset: MediaAssetBase):
    doc = asset.model_dump()
    doc["_id"] = str(uuid.uuid4())
    await db.media_assets.insert_one(doc)
    return to_response(doc)


@router.put("/media/{media_id}", response_model=MediaAssetResponse, dependencies=[Depends(get_current_admin)])
async def update_media(media_id: str, asset: MediaAssetBase):
    update = {"$set": asset.model_dump()}
    res = await db.media_assets.update_one({"_id": media_id}, update)
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Media not found")
    doc = await db.media_assets.find_one({"_id": media_id})
    return to_response(doc)


# Hero content
class HeroContentBase(BaseModel):
    title_en: str
    title_fr: str
    subtitle_en: str
    subtitle_fr: str
    tagline_en: str
    tagline_fr: str
    media_key: str


class HeroContentResponse(HeroContentBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


@router.get("/content/hero", response_model=HeroContentResponse)
async def get_hero_content():
    doc = await db.hero_content.find_one({})
    if not doc:
        # Minimal default
        default_doc = {
            "_id": str(uuid.uuid4()),
            "title_en": "Gatineau Ottawa Social Elite Club",
            "title_fr": "Club Social d'Élite Gatineau Ottawa",
            "subtitle_en": "Community-based soccer and community programs.",
            "subtitle_fr": "Programmes de soccer et communautaires.",
            "tagline_en": "Using sport, culture, and education to connect communities.",
            "tagline_fr": "Utiliser le sport, la culture et l'éducation pour relier les communautés.",
            "media_key": "hero.main",
        }
        await db.hero_content.insert_one(default_doc)
        return to_response(default_doc)
    return to_response(doc)


class HeroContentUpdate(HeroContentBase):
    pass


@router.put("/content/hero", response_model=HeroContentResponse, dependencies=[Depends(get_current_admin)])
async def update_hero_content(payload: HeroContentUpdate):
    data = payload.model_dump()
    existing = await db.hero_content.find_one({})
    if existing:
        await db.hero_content.update_one({"_id": existing["_id"]}, {"$set": data})
        doc = await db.hero_content.find_one({"_id": existing["_id"]})
    else:
        doc = {"_id": str(uuid.uuid4()), **data}
        await db.hero_content.insert_one(doc)
    return to_response(doc)


# About content
class AboutContentBase(BaseModel):
    about_en: str
    about_fr: str
    mission_en: str
    mission_fr: str
    vision_en: str
    vision_fr: str


class AboutContentResponse(AboutContentBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


@router.get("/content/about", response_model=AboutContentResponse)
async def get_about_content():
    doc = await db.about_content.find_one({})
    if not doc:
        default_doc = {
            "_id": str(uuid.uuid4()),
            "about_en": "GOSEC is a non-profit community club that uses soccer, culture, and education to support youth, families, newcomers, and community members in Gatineau and Ottawa.",
            "about_fr": "GOSEC est un organisme à but non lucratif qui utilise le soccer, la culture et l'éducation pour soutenir les jeunes, les familles, les nouveaux arrivants et la communauté à Gatineau et Ottawa.",
            "mission_en": "To promote inclusion, healthy living, and personal growth through sports, culture, and career integration.",
            "mission_fr": "Promouvoir l'inclusion, le bien-être et le développement personnel par le sport, la culture et l'intégration professionnelle.",
            "vision_en": "A strong, inclusive, and connected community across Gatineau and Ottawa.",
            "vision_fr": "Une communauté forte, inclusive et solidaire reliant Gatineau et Ottawa.",
        }
        await db.about_content.insert_one(default_doc)
        return to_response(default_doc)
    return to_response(doc)


class AboutContentUpdate(AboutContentBase):
    pass


@router.put("/content/about", response_model=AboutContentResponse, dependencies=[Depends(get_current_admin)])
async def update_about_content(payload: AboutContentUpdate):
    data = payload.model_dump()
    existing = await db.about_content.find_one({})
    if existing:
        await db.about_content.update_one({"_id": existing["_id"]}, {"$set": data})
        doc = await db.about_content.find_one({"_id": existing["_id"]})
    else:
        doc = {"_id": str(uuid.uuid4()), **data}
        await db.about_content.insert_one(doc)
    return to_response(doc)
