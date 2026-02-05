from datetime import datetime
from typing import List

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId

from ..database import db

router = APIRouter(prefix="/api/forms", tags=["forms"])


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)


# Join form
class JoinFormBase(BaseModel):
    name: str
    email: EmailStr
    age_group: str = ""
    message: str = ""


class JoinForm(JoinFormBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


@router.post("/join", response_model=JoinForm)
async def submit_join(form: JoinFormBase):
    doc = JoinForm(**form.dict()).dict(by_alias=True)
    res = await db.join_forms.insert_one(doc)
    doc["_id"] = res.inserted_id
    return doc


@router.get("/join", response_model=List[JoinForm])
async def list_join():
    items = await db.join_forms.find().sort("created_at", -1).to_list(500)
    return items


# Donate form (pledge only)
class DonateFormBase(BaseModel):
    name: str
    email: EmailStr
    amount: float
    message: str = ""


class DonateForm(DonateFormBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


@router.post("/donate", response_model=DonateForm)
async def submit_donate(form: DonateFormBase):
    doc = DonateForm(**form.dict()).dict(by_alias=True)
    res = await db.donate_forms.insert_one(doc)
    doc["_id"] = res.inserted_id
    return doc


@router.get("/donate", response_model=List[DonateForm])
async def list_donate():
    items = await db.donate_forms.find().sort("created_at", -1).to_list(500)
    return items


# Contact form
class ContactFormBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str = ""
    topic: str = ""
    relation: str = ""
    city: str = ""
    message: str


class ContactForm(ContactFormBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


@router.post("/contact", response_model=ContactForm)
async def submit_contact(form: ContactFormBase):
    doc = ContactForm(**form.dict()).dict(by_alias=True)
    res = await db.contact_forms.insert_one(doc)
    doc["_id"] = res.inserted_id
    return doc


@router.get("/contact", response_model=List[ContactForm])
async def list_contact():
    items = await db.contact_forms.find().sort("created_at", -1).to_list(500)
    return items
