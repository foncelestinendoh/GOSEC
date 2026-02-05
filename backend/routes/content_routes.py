from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId

from backend.database import db
from backend.routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api", tags=["content"])


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):  # pragma: no cover - pydantic hook
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)


# Media
class MediaAssetBase(BaseModel):
    key: str
    url: str
    alt_en: Optional[str] = ""
    alt_fr: Optional[str] = ""


class MediaAsset(MediaAssetBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


@router.get("/media", response_model=List[MediaAsset])
async def list_media():
    items = await db.media_assets.find().to_list(200)
    return items


@router.post("/media", response_model=MediaAsset, dependencies=[Depends(get_current_admin)])
async def create_media(asset: MediaAssetBase):
    doc = asset.dict()
    res = await db.media_assets.insert_one(doc)
    doc["_id"] = res.inserted_id
    return doc


@router.put("/media/{media_id}", response_model=MediaAsset, dependencies=[Depends(get_current_admin)])
async def update_media(media_id: str, asset: MediaAssetBase):
    oid = ObjectId(media_id)
    update = {"$set": asset.dict()}
    res = await db.media_assets.update_one({"_id": oid}, update)
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Media not found")
    doc = await db.media_assets.find_one({"_id": oid})
    return doc


# Hero content
class HeroContent(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title_en: str
    title_fr: str
    subtitle_en: str
    subtitle_fr: str
    tagline_en: str
    tagline_fr: str
    media_key: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


@router.get("/content/hero", response_model=HeroContent)
async def get_hero_content():
    doc = await db.hero_content.find_one({})
    if not doc:
        # Minimal default
        default_doc = {
            "title_en": "Gatineau Ottawa Social Elite Club",
            "title_fr": "Club Social d’Élite Gatineau Ottawa",
            "subtitle_en": "Community-based soccer and community programs.",
            "subtitle_fr": "Programmes de soccer et communautaires.",
            "tagline_en": "Using sport, culture, and education to connect communities.",
            "tagline_fr": "Utiliser le sport, la culture et l’éducation pour relier les communautés.",
            "media_key": "hero.main",
        }
        res = await db.hero_content.insert_one(default_doc)
        default_doc["_id"] = res.inserted_id
        return default_doc
    return doc


@router.put("/content/hero", response_model=HeroContent, dependencies=[Depends(get_current_admin)])
async def update_hero_content(payload: HeroContent):
    data = payload.dict(by_alias=True)
    _id = data.pop("_id", None)
    if _id is None:
        # Upsert single document
        res = await db.hero_content.find_one_and_update(
            {}, {"$set": data}, upsert=True, return_document=True
        )
        return res
    oid = ObjectId(str(_id))
    await db.hero_content.update_one({"_id": oid}, {"$set": data})
    doc = await db.hero_content.find_one({"_id": oid})
    return doc


# About content
class AboutContent(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    about_en: str
    about_fr: str
    mission_en: str
    mission_fr: str
    vision_en: str
    vision_fr: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


@router.get("/content/about", response_model=AboutContent)
async def get_about_content():
    doc = await db.about_content.find_one({})
    if not doc:
        default_doc = {
            "about_en": "GOSEC is a non-profit community club that uses soccer, culture, and education to support youth, families, newcomers, and community members in Gatineau and Ottawa.",
            "about_fr": "GOSEC est un organisme à but non lucratif qui utilise le soccer, la culture et l’éducation pour soutenir les jeunes, les familles, les nouveaux arrivants et la communauté à Gatineau et Ottawa.",
            "mission_en": "To promote inclusion, healthy living, and personal growth through sports, culture, and career integration.",
            "mission_fr": "Promouvoir l’inclusion, le bien-être et le développement personnel par le sport, la culture et l’intégration professionnelle.",
            "vision_en": "A strong, inclusive, and connected community across Gatineau and Ottawa.",
            "vision_fr": "Une communauté forte, inclusive et solidaire reliant Gatineau et Ottawa.",
        }
        res = await db.about_content.insert_one(default_doc)
        default_doc["_id"] = res.inserted_id
        return default_doc
    return doc


@router.put("/content/about", response_model=AboutContent, dependencies=[Depends(get_current_admin)])
async def update_about_content(payload: AboutContent):
    data = payload.dict(by_alias=True)
    _id = data.pop("_id", None)
    if _id is None:
        res = await db.about_content.find_one_and_update(
            {}, {"$set": data}, upsert=True, return_document=True
        )
        return res
    oid = ObjectId(str(_id))
    await db.about_content.update_one({"_id": oid}, {"$set": data})
    doc = await db.about_content.find_one({"_id": oid})
    return doc
