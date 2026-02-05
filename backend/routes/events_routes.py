from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
import uuid

from database import db
from routes.auth_routes import get_current_admin

router = APIRouter(prefix="/api", tags=["events"])


# Helper to convert Mongo docs to response format
def to_response(doc: dict) -> dict:
    """Convert MongoDB doc, converting _id to string id"""
    if doc is None:
        return None
    result = dict(doc)
    if "_id" in result:
        result["id"] = str(result.pop("_id"))
    return result


# Events models
class EventBase(BaseModel):
    date_en: str
    date_fr: str
    title_en: str
    title_fr: str
    location_en: str
    location_fr: str
    summary_en: str
    summary_fr: str
    media_key: str = ""
    image_url: str = ""
    order: int = 0


class EventResponse(EventBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    date_en: Optional[str] = None
    date_fr: Optional[str] = None
    title_en: Optional[str] = None
    title_fr: Optional[str] = None
    location_en: Optional[str] = None
    location_fr: Optional[str] = None
    summary_en: Optional[str] = None
    summary_fr: Optional[str] = None
    media_key: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None


# Default events data
DEFAULT_EVENTS = [
    {
        "_id": str(uuid.uuid4()),
        "date_en": "August 15, 2025",
        "date_fr": "15 août 2025",
        "title_en": "Summer Soccer Tournament",
        "title_fr": "Tournoi de soccer d'été",
        "location_en": "Gatineau Sports Complex",
        "location_fr": "Complexe sportif de Gatineau",
        "summary_en": "Join us for our annual summer soccer tournament featuring teams from across the region. All skill levels welcome!",
        "summary_fr": "Rejoignez-nous pour notre tournoi de soccer d'été annuel mettant en vedette des équipes de toute la région. Tous les niveaux de compétence sont les bienvenus!",
        "media_key": "events.soccer_tournament",
        "image_url": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
        "order": 1
    },
    {
        "_id": str(uuid.uuid4()),
        "date_en": "September 5, 2025",
        "date_fr": "5 septembre 2025",
        "title_en": "Back to School Family BBQ",
        "title_fr": "BBQ familial de rentrée scolaire",
        "location_en": "GOSEC Community Center",
        "location_fr": "Centre communautaire GOSEC",
        "summary_en": "Celebrate the new school year with food, games, and community connections. Bring the whole family!",
        "summary_fr": "Célébrez la nouvelle année scolaire avec de la nourriture, des jeux et des connexions communautaires. Amenez toute la famille!",
        "media_key": "events.bbq",
        "image_url": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        "order": 2
    },
    {
        "_id": str(uuid.uuid4()),
        "date_en": "October 12, 2025",
        "date_fr": "12 octobre 2025",
        "title_en": "Cultural Heritage Festival",
        "title_fr": "Festival du patrimoine culturel",
        "location_en": "Ottawa Convention Centre",
        "location_fr": "Centre des congrès d'Ottawa",
        "summary_en": "A celebration of diverse cultures through music, dance, food, and art from communities across Gatineau and Ottawa.",
        "summary_fr": "Une célébration de diverses cultures à travers la musique, la danse, la nourriture et l'art des communautés de Gatineau et d'Ottawa.",
        "media_key": "events.cultural_festival",
        "image_url": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        "order": 3
    },
    {
        "_id": str(uuid.uuid4()),
        "date_en": "November 20, 2025",
        "date_fr": "20 novembre 2025",
        "title_en": "Youth Leadership Conference",
        "title_fr": "Conférence sur le leadership des jeunes",
        "location_en": "University of Ottawa",
        "location_fr": "Université d'Ottawa",
        "summary_en": "Empowering the next generation of leaders through workshops, speakers, and networking opportunities.",
        "summary_fr": "Autonomiser la prochaine génération de leaders grâce à des ateliers, des conférenciers et des opportunités de réseautage.",
        "media_key": "events.youth_conference",
        "image_url": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
        "order": 4
    }
]


@router.get("/events", response_model=List[EventResponse])
async def list_events():
    """Get all events sorted by order"""
    items = await db.events.find().sort("order", 1).to_list(100)
    if not items:
        # Insert default events
        for event in DEFAULT_EVENTS:
            await db.events.insert_one(event)
        items = await db.events.find().sort("order", 1).to_list(100)
    return [to_response(item) for item in items]


@router.get("/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: str):
    """Get a single event by ID"""
    doc = await db.events.find_one({"_id": event_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Event not found")
    return to_response(doc)


@router.post("/events", response_model=EventResponse, dependencies=[Depends(get_current_admin)])
async def create_event(event: EventCreate):
    """Create a new event (admin only)"""
    doc = event.model_dump()
    doc["_id"] = str(uuid.uuid4())
    await db.events.insert_one(doc)
    return to_response(doc)


@router.put("/events/{event_id}", response_model=EventResponse, dependencies=[Depends(get_current_admin)])
async def update_event(event_id: str, event: EventUpdate):
    """Update an existing event (admin only)"""
    update_data = {k: v for k, v in event.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    res = await db.events.update_one({"_id": event_id}, {"$set": update_data})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    
    doc = await db.events.find_one({"_id": event_id})
    return to_response(doc)


@router.delete("/events/{event_id}", dependencies=[Depends(get_current_admin)])
async def delete_event(event_id: str):
    """Delete an event (admin only)"""
    res = await db.events.delete_one({"_id": event_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}
