class Address:
def __init__(self, street, city, zip_code):
self.street = street
self.city = city
self.zip_code = zip_code
def display(self):
return f"{self.street}, {self.city} - {self.zip_code}"
class Student:
def __init__(self, name, age, address):
self.name = name
self.age = age
self.address = address
self._courses = []
@property
def age(self):
return self._age
@age.setter
def age(self, value):
if not isinstance(value, int):
raise TypeError("Age must be an integer.")
if value < 5 or value > 100:
raise ValueError(f"Age must be between 5 and 100. Got:
{value}")
self._age = value

def add_course(self, course):
if not isinstance(course, str) or not course.strip():
raise ValueError("Course name must be a non-empty string.")
if course in self._courses:
print(f" [Warning] '{course}' is already added.")
return
self._courses.append(course)
print(f" [Course Added] '{course}' added to {self.name}'s course
list.")
def display(self):
print("------------------------------------------")
print(" Student Details")
print("------------------------------------------")
print(f" Name : {self.name}")
print(f" Age : {self._age}")
print(f" Address : {self.address.display()}")
print(f" Courses : {', '.join(self._courses) if self._courses
else 'None'}")
print("------------------------------------------")

class ScholarshipStudent(Student):
def __init__(self, name, age, address, scholarship_amount):
super().__init__(name, age, address)
if scholarship_amount < 0:
raise ValueError("Scholarship amount cannot be negative.")
self.scholarship_amount = scholarship_amount
def display(self):
super().display()
print(" -- Scholarship Details --")
print(f" Scholarship : Rs. {self.scholarship_amount:,.2f}")
print("------------------------------------------")
def test_exception(scenario, action):
print(f" [TEST] {scenario} -> ", end="")

try:
action()
print("No exception thrown (unexpected!)")
except (ValueError, TypeError) as e:
print(f"Exception caught OK ({e})")

if __name__ == "__main__":
print("==========================================")
print(" STUDENT MANAGEMENT SYSTEM ")
print("==========================================\n")
addr1 = Address("12 MG Road", "Guwahati", "781001")
addr2 = Address("45 Park Street", "Kolkata", "700016")
s1 = Student("Alice", 20, addr1)
s2 = Student("Bob", 22, addr2)
addr3 = Address("7 Lake View", "Delhi", "110001")
ss1 = ScholarshipStudent("Charlie", 21, addr3, 75000)
print(">> Adding courses for Alice:")
s1.add_course("Mathematics")
s1.add_course("Physics")
s1.add_course("Computer Science")
s1.add_course("Physics")
print()
print(">> Adding courses for Bob:")
s2.add_course("Economics")
s2.add_course("History")
print()
print(">> Adding courses for Charlie (ScholarshipStudent):")
ss1.add_course("Data Science")
ss1.add_course("Machine Learning")
print()

print("==========================================")
print(" STUDENT SUMMARY ")
print("==========================================\n")
s1.display()
print()
s2.display()
print()
ss1.display()
print()
print("==========================================")
print(" MUTABLE BEHAVIOR DEMO ")
print("==========================================")
print(f" Alice's courses before: {s1._courses}")
s1.add_course("Chemistry")
print(f" Alice's courses after : {s1._courses}")
print()
print("==========================================")
print(" VALIDATION / ERROR HANDLING DEMO ")
print("==========================================")
test_exception("Age below minimum (age=3)",
lambda: Student("X", 3, addr1))
test_exception("Age above maximum (age=150)",
lambda: Student("X", 150, addr1))
test_exception("Age as string (age='twenty')",
lambda: Student("X", "twenty", addr1))
test_exception("Negative scholarship amount",
lambda: ScholarshipStudent("X", 20, addr1, -5000))
test_exception("Empty course name",
lambda: s1.add_course(""))
print("\nAll validations passed correctly.")
