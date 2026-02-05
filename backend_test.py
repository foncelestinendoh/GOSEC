#!/usr/bin/env python3
"""
GOSEC Backend API Testing Suite
Tests all backend endpoints as specified in the review request
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env
BACKEND_URL = "https://black-youth-dev-1.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_success(msg):
    print(f"{Colors.GREEN}✅ {msg}{Colors.ENDC}")

def print_error(msg):
    print(f"{Colors.RED}❌ {msg}{Colors.ENDC}")

def print_warning(msg):
    print(f"{Colors.YELLOW}⚠️  {msg}{Colors.ENDC}")

def print_info(msg):
    print(f"{Colors.BLUE}ℹ️  {msg}{Colors.ENDC}")

def print_header(msg):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.BLUE}{msg}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")

class GOSECAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.access_token = None
        self.headers = {"Content-Type": "application/json"}
        self.test_results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }

    def make_request(self, method, endpoint, data=None, auth_required=False):
        """Make HTTP request with proper error handling"""
        url = f"{self.base_url}{endpoint}"
        headers = self.headers.copy()
        
        if auth_required and self.access_token:
            headers["Authorization"] = f"Bearer {self.access_token}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=headers, timeout=30)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method.upper() == "PUT":
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method.upper() == "DELETE":
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            return response
        except requests.exceptions.RequestException as e:
            print_error(f"Request failed for {method} {endpoint}: {str(e)}")
            return None

    def test_auth_login(self):
        """Test 1: Auth Login API"""
        print_header("Testing Auth Login API")
        
        # Test login with correct credentials
        login_data = {
            "username": "admin",
            "password": "gosec_admin"
        }
        
        # Use form data for OAuth2PasswordRequestForm
        response = requests.post(
            f"{self.base_url}/auth/login",
            data=login_data,  # Use data instead of json for form data
            timeout=30
        )
        
        if response is None:
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Auth login request failed")
            return False
        
        if response.status_code == 200:
            try:
                result = response.json()
                if "access_token" in result and "token_type" in result:
                    self.access_token = result["access_token"]
                    print_success(f"Login successful - Token type: {result['token_type']}")
                    self.test_results["passed"] += 1
                    return True
                else:
                    print_error("Login response missing required fields")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append("Login response missing access_token or token_type")
                    return False
            except json.JSONDecodeError:
                print_error("Invalid JSON response from login")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from login")
                return False
        else:
            print_error(f"Login failed with status {response.status_code}: {response.text}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append(f"Login failed with status {response.status_code}")
            return False

    def test_content_apis(self):
        """Test 2: Content APIs (Hero & About)"""
        print_header("Testing Content APIs")
        
        # Test hero content
        response = self.make_request("GET", "/content/hero")
        if response and response.status_code == 200:
            try:
                hero_data = response.json()
                required_fields = ["title_en", "title_fr", "subtitle_en", "subtitle_fr", "tagline_en", "tagline_fr"]
                if all(field in hero_data for field in required_fields):
                    print_success("Hero content API working - all required fields present")
                    self.test_results["passed"] += 1
                else:
                    missing = [f for f in required_fields if f not in hero_data]
                    print_error(f"Hero content missing fields: {missing}")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append(f"Hero content missing fields: {missing}")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from hero content")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from hero content")
        else:
            print_error(f"Hero content API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Hero content API failed")
        
        # Test about content
        response = self.make_request("GET", "/content/about")
        if response and response.status_code == 200:
            try:
                about_data = response.json()
                required_fields = ["mission_en", "mission_fr", "vision_en", "vision_fr", "about_en", "about_fr"]
                if all(field in about_data for field in required_fields):
                    print_success("About content API working - all required fields present")
                    self.test_results["passed"] += 1
                else:
                    missing = [f for f in required_fields if f not in about_data]
                    print_error(f"About content missing fields: {missing}")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append(f"About content missing fields: {missing}")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from about content")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from about content")
        else:
            print_error(f"About content API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("About content API failed")

    def test_programs_api(self):
        """Test 3: Programs API"""
        print_header("Testing Programs API")
        
        # Test list programs
        response = self.make_request("GET", "/programs")
        if response and response.status_code == 200:
            try:
                programs = response.json()
                if isinstance(programs, list) and len(programs) == 5:
                    print_success(f"Programs list API working - returned {len(programs)} default programs")
                    self.test_results["passed"] += 1
                    
                    # Test specific program (soccer)
                    soccer_program = None
                    for program in programs:
                        if program.get("id") == "soccer":
                            soccer_program = program
                            break
                    
                    if soccer_program:
                        response = self.make_request("GET", "/programs/soccer")
                        if response and response.status_code == 200:
                            soccer_data = response.json()
                            if soccer_data.get("title_en") == "Recreational Soccer":
                                print_success("Soccer program API working correctly")
                                self.test_results["passed"] += 1
                            else:
                                print_error("Soccer program data incorrect")
                                self.test_results["failed"] += 1
                                self.test_results["errors"].append("Soccer program data incorrect")
                        else:
                            print_error(f"Soccer program API failed: {response.status_code if response else 'No response'}")
                            self.test_results["failed"] += 1
                            self.test_results["errors"].append("Soccer program API failed")
                    else:
                        print_warning("Soccer program not found in programs list")
                        self.test_results["failed"] += 1
                        self.test_results["errors"].append("Soccer program not found")
                else:
                    print_error(f"Expected 5 programs, got {len(programs) if isinstance(programs, list) else 'non-list'}")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append(f"Expected 5 programs, got {len(programs) if isinstance(programs, list) else 'non-list'}")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from programs")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from programs")
        else:
            print_error(f"Programs API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Programs API failed")

    def test_gallery_api(self):
        """Test 4: Gallery API"""
        print_header("Testing Gallery API")
        
        response = self.make_request("GET", "/gallery")
        if response and response.status_code == 200:
            try:
                gallery = response.json()
                if isinstance(gallery, list) and len(gallery) >= 6:
                    # Check if all items have image_url
                    all_have_images = all("image_url" in item and item["image_url"] for item in gallery)
                    if all_have_images:
                        print_success(f"Gallery API working - returned {len(gallery)} items with image URLs (expected 6+ due to uploads)")
                        self.test_results["passed"] += 1
                    else:
                        print_error("Some gallery items missing image_url")
                        self.test_results["failed"] += 1
                        self.test_results["errors"].append("Some gallery items missing image_url")
                else:
                    print_error(f"Expected at least 6 gallery items, got {len(gallery) if isinstance(gallery, list) else 'non-list'}")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append(f"Expected at least 6 gallery items, got {len(gallery) if isinstance(gallery, list) else 'non-list'}")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from gallery")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from gallery")
        else:
            print_error(f"Gallery API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Gallery API failed")

    def test_events_api(self):
        """Test 5: Events API"""
        print_header("Testing Events API")
        
        response = self.make_request("GET", "/events")
        if response and response.status_code == 200:
            try:
                events = response.json()
                if isinstance(events, list) and len(events) == 4:
                    # Check if all events have dates and locations
                    required_fields = ["date_en", "date_fr", "location_en", "location_fr"]
                    all_valid = all(
                        all(field in event for field in required_fields) 
                        for event in events
                    )
                    if all_valid:
                        print_success(f"Events API working - returned {len(events)} events with dates and locations")
                        self.test_results["passed"] += 1
                    else:
                        print_error("Some events missing required date/location fields")
                        self.test_results["failed"] += 1
                        self.test_results["errors"].append("Some events missing required date/location fields")
                else:
                    print_error(f"Expected 4 events, got {len(events) if isinstance(events, list) else 'non-list'}")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append(f"Expected 4 events, got {len(events) if isinstance(events, list) else 'non-list'}")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from events")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from events")
        else:
            print_error(f"Events API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Events API failed")

    def test_leadership_api(self):
        """Test 6: Leadership API - NEW FEATURE"""
        print_header("Testing Leadership API (NEW FEATURE)")
        
        response = self.make_request("GET", "/leadership")
        if response and response.status_code == 200:
            try:
                leadership = response.json()
                if isinstance(leadership, list) and len(leadership) == 8:
                    # Check if first member is Jean-Pierre Mbeki with correct role
                    first_member = leadership[0]
                    if (first_member.get("name") == "Jean-Pierre Mbeki" and 
                        first_member.get("role_en") == "Founder & President"):
                        print_success("Leadership API working - 8 members returned, Jean-Pierre Mbeki is first with correct role")
                        
                        # Verify all required fields are present
                        required_fields = ["name", "role_en", "role_fr", "bio_en", "bio_fr", "email", "image_url"]
                        all_valid = all(
                            all(field in member for field in required_fields) 
                            for member in leadership
                        )
                        if all_valid:
                            print_success("All leadership members have required fields (name, role_en, role_fr, bio, email, image_url)")
                            self.test_results["passed"] += 1
                        else:
                            print_error("Some leadership members missing required fields")
                            self.test_results["failed"] += 1
                            self.test_results["errors"].append("Some leadership members missing required fields")
                    else:
                        print_error(f"First member should be Jean-Pierre Mbeki with role 'Founder & President', got: {first_member.get('name')} - {first_member.get('role_en')}")
                        self.test_results["failed"] += 1
                        self.test_results["errors"].append("First leadership member incorrect")
                else:
                    print_error(f"Expected 8 leadership members, got {len(leadership) if isinstance(leadership, list) else 'non-list'}")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append(f"Expected 8 leadership members, got {len(leadership) if isinstance(leadership, list) else 'non-list'}")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from leadership")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from leadership")
        else:
            print_error(f"Leadership API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Leadership API failed")

    def test_events_upload_api(self):
        """Test 7: Events Upload API - NEW FEATURE"""
        print_header("Testing Events Upload API (NEW FEATURE)")
        
        if not self.access_token:
            print_error("No access token available for upload test")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("No access token for events upload test")
            return
        
        # Create a simple test image file
        import io
        test_image_content = b"fake_image_data_for_testing"
        
        # Test events upload endpoint
        files = {"file": ("test_image.jpg", io.BytesIO(test_image_content), "image/jpeg")}
        headers = {"Authorization": f"Bearer {self.access_token}"}
        
        try:
            response = requests.post(
                f"{self.base_url}/events/upload",
                files=files,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                try:
                    result = response.json()
                    if "filename" in result and "image_url" in result and "message" in result:
                        print_success("Events upload API working - file uploaded successfully")
                        self.test_results["passed"] += 1
                        
                        # Test if the uploaded image can be accessed
                        image_url = result["image_url"]
                        if image_url.startswith("/api/uploads/events/"):
                            print_success("Events upload returns correct image URL format")
                        else:
                            print_warning(f"Unexpected image URL format: {image_url}")
                    else:
                        print_error("Events upload response missing required fields")
                        self.test_results["failed"] += 1
                        self.test_results["errors"].append("Events upload response missing required fields")
                except json.JSONDecodeError:
                    print_error("Invalid JSON response from events upload")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append("Invalid JSON response from events upload")
            else:
                print_error(f"Events upload failed with status {response.status_code}: {response.text}")
                self.test_results["failed"] += 1
                self.test_results["errors"].append(f"Events upload failed with status {response.status_code}")
        except requests.exceptions.RequestException as e:
            print_error(f"Events upload request failed: {str(e)}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append(f"Events upload request failed: {str(e)}")

    def test_gallery_upload_api(self):
        """Test 8: Gallery Upload API - NEW FEATURE"""
        print_header("Testing Gallery Upload API (NEW FEATURE)")
        
        if not self.access_token:
            print_error("No access token available for upload test")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("No access token for gallery upload test")
            return
        
        # Create a simple test image file
        import io
        test_image_content = b"fake_image_data_for_testing"
        
        # Test gallery upload endpoint
        files = {"file": ("test_gallery.png", io.BytesIO(test_image_content), "image/png")}
        headers = {"Authorization": f"Bearer {self.access_token}"}
        
        try:
            response = requests.post(
                f"{self.base_url}/gallery/upload",
                files=files,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                try:
                    result = response.json()
                    if "filename" in result and "image_url" in result and "message" in result:
                        print_success("Gallery upload API working - file uploaded successfully")
                        self.test_results["passed"] += 1
                        
                        # Test if the uploaded image can be accessed
                        image_url = result["image_url"]
                        if image_url.startswith("/api/uploads/gallery/"):
                            print_success("Gallery upload returns correct image URL format")
                            
                            # Test accessing the uploaded image
                            filename = image_url.split("/")[-1]
                            image_response = self.make_request("GET", f"/uploads/gallery/{filename}")
                            if image_response and image_response.status_code == 200:
                                print_success("Uploaded gallery image is accessible via URL")
                                self.test_results["passed"] += 1
                            else:
                                print_error(f"Cannot access uploaded gallery image: {image_response.status_code if image_response else 'No response'}")
                                self.test_results["failed"] += 1
                                self.test_results["errors"].append("Cannot access uploaded gallery image")
                        else:
                            print_warning(f"Unexpected image URL format: {image_url}")
                    else:
                        print_error("Gallery upload response missing required fields")
                        self.test_results["failed"] += 1
                        self.test_results["errors"].append("Gallery upload response missing required fields")
                except json.JSONDecodeError:
                    print_error("Invalid JSON response from gallery upload")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append("Invalid JSON response from gallery upload")
            else:
                print_error(f"Gallery upload failed with status {response.status_code}: {response.text}")
                self.test_results["failed"] += 1
                self.test_results["errors"].append(f"Gallery upload failed with status {response.status_code}")
        except requests.exceptions.RequestException as e:
            print_error(f"Gallery upload request failed: {str(e)}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append(f"Gallery upload request failed: {str(e)}")

    def test_forms_api(self):
        """Test 9: Forms API (Contact, Join, Donate)"""
        print_header("Testing Forms API")
        
        # Test contact form
        contact_data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "message": "Hello from test"
        }
        
        response = self.make_request("POST", "/forms/contact", contact_data)
        if response and response.status_code == 200:
            try:
                result = response.json()
                if "id" in result and result["email"] == contact_data["email"]:
                    print_success("Contact form API working")
                    self.test_results["passed"] += 1
                else:
                    print_error("Contact form response invalid")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append("Contact form response invalid")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from contact form")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from contact form")
        else:
            print_error(f"Contact form API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Contact form API failed")
        
        # Test join form
        join_data = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "age_group": "Adult",
            "message": "Interested in soccer programs"
        }
        
        response = self.make_request("POST", "/forms/join", join_data)
        if response and response.status_code == 200:
            try:
                result = response.json()
                if "id" in result and result["email"] == join_data["email"]:
                    print_success("Join form API working")
                    self.test_results["passed"] += 1
                else:
                    print_error("Join form response invalid")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append("Join form response invalid")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from join form")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from join form")
        else:
            print_error(f"Join form API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Join form API failed")
        
        # Test donate form
        donate_data = {
            "name": "Bob Wilson",
            "email": "bob.wilson@example.com",
            "amount": 100.0,
            "message": "Happy to support the community"
        }
        
        response = self.make_request("POST", "/forms/donate", donate_data)
        if response and response.status_code == 200:
            try:
                result = response.json()
                if "id" in result and result["email"] == donate_data["email"]:
                    print_success("Donate form API working")
                    self.test_results["passed"] += 1
                else:
                    print_error("Donate form response invalid")
                    self.test_results["failed"] += 1
                    self.test_results["errors"].append("Donate form response invalid")
            except json.JSONDecodeError:
                print_error("Invalid JSON response from donate form")
                self.test_results["failed"] += 1
                self.test_results["errors"].append("Invalid JSON response from donate form")
        else:
            print_error(f"Donate form API failed: {response.status_code if response else 'No response'}")
            self.test_results["failed"] += 1
            self.test_results["errors"].append("Donate form API failed")

    def run_all_tests(self):
        """Run all API tests"""
        print_info(f"Starting GOSEC Backend API Tests - Focus on NEW UPLOAD FEATURES")
        print_info(f"Backend URL: {self.base_url}")
        print_info(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Run tests in order - Auth first for token
        self.test_auth_login()
        
        # Test existing APIs
        self.test_content_apis()
        self.test_programs_api()
        self.test_gallery_api()
        self.test_events_api()
        self.test_forms_api()
        
        # Test NEW FEATURES - Leadership and Upload APIs
        self.test_leadership_api()
        self.test_events_upload_api()
        self.test_gallery_upload_api()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test results summary"""
        print_header("Test Results Summary")
        
        total_tests = self.test_results["passed"] + self.test_results["failed"]
        
        if self.test_results["passed"] > 0:
            print_success(f"Passed: {self.test_results['passed']}/{total_tests}")
        
        if self.test_results["failed"] > 0:
            print_error(f"Failed: {self.test_results['failed']}/{total_tests}")
            print_error("Errors encountered:")
            for i, error in enumerate(self.test_results["errors"], 1):
                print(f"  {i}. {error}")
        
        if self.test_results["failed"] == 0:
            print_success("🎉 All tests passed!")
            return True
        else:
            print_error("❌ Some tests failed!")
            return False

if __name__ == "__main__":
    tester = GOSECAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)