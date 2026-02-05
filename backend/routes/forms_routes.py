from datetime import datetime
from typing import List
import uuid

from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr, Field, ConfigDict

from database import db
from routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api/forms", tags=["forms"])


# Helper to convert Mongo docs to response format
def to_response(doc: dict) -> dict:
    """Convert MongoDB doc, converting _id to string id"""
    if doc is None:
        return None
    result = dict(doc)
    if "_id" in result:
        result["id"] = str(result.pop("_id"))
    return result


# Join form
class JoinFormBase(BaseModel):
    name: str
    email: EmailStr
    age_group: str = ""
    message: str = ""


class JoinFormResponse(JoinFormBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


@router.post("/join", response_model=JoinFormResponse)
async def submit_join(form: JoinFormBase):
    doc = form.model_dump()
    doc["_id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.utcnow()
    await db.join_forms.insert_one(doc)
    return to_response(doc)


@router.get("/join", response_model=List[JoinFormResponse], dependencies=[Depends(get_current_admin)])
async def list_join():
    items = await db.join_forms.find().sort("created_at", -1).to_list(500)
    return [to_response(item) for item in items]


# Donate form (pledge only)
class DonateFormBase(BaseModel):
    name: str
    email: EmailStr
    amount: float
    message: str = ""


class DonateFormResponse(DonateFormBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


@router.post("/donate", response_model=DonateFormResponse)
async def submit_donate(form: DonateFormBase):
    doc = form.model_dump()
    doc["_id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.utcnow()
    await db.donate_forms.insert_one(doc)
    return to_response(doc)


@router.get("/donate", response_model=List[DonateFormResponse], dependencies=[Depends(get_current_admin)])
async def list_donate():
    items = await db.donate_forms.find().sort("created_at", -1).to_list(500)
    return [to_response(item) for item in items]


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


class ContactFormResponse(ContactFormBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


@router.post("/contact", response_model=ContactFormResponse)
async def submit_contact(form: ContactFormBase):
    doc = form.model_dump()
    doc["_id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.utcnow()
    await db.contact_forms.insert_one(doc)
    return to_response(doc)


@router.get("/contact", response_model=List[ContactFormResponse], dependencies=[Depends(get_current_admin)])
async def list_contact():
    items = await db.contact_forms.find().sort("created_at", -1).to_list(500)
    return [to_response(item) for item in items]
