import java.util.*;
import java.util.stream.Collectors;
class Student {
private int id;
private String name;
private List<String> courses;
private Map<String, Integer> scores;
public Student(int id, String name, List<String> courses, Map<String,
Integer> scores) {
this.id = id;
this.name = name;
this.courses = new ArrayList<>(courses);
this.scores = new HashMap<>(scores);
}
public int getId() {
return id;
}
public String getName() {
return name;
}
public List<String> getCourses() {
return courses;
}
public Map<String, Integer> getScores() {
return scores;
}

public double getAverageScore() {
if (courses.isEmpty()) return 0.0;
double total = courses.stream()
.mapToInt(course -> scores.getOrDefault(course, 0))
.sum();
return total / courses.size();
}
@Override
public String toString() {
return name + " (Avg: " + getAverageScore() + ")";
}
}
class StudentPerformanceAnalyzer {

public static List<Student> getTopNStudents(List<Student> students,
int n) {
Comparator<Student> avgComparator =
Comparator.comparingDouble(Student::getAverageScore).reversed();
return students.stream()
.sorted(avgComparator)
.limit(n)
.collect(Collectors.toList());
}

public static Map<String, Double>
getAverageScorePerCourse(List<Student> students) {

Set<String> allCourses = getAllUniqueCourses(students);
Map<String, Double> courseAverage = new HashMap<>();

for (String course : allCourses) {
double avg = students.stream()
.mapToInt(student ->
student.getScores().getOrDefault(course, 0))
.average()
.orElse(0.0);
courseAverage.put(course, avg);
}
return courseAverage;
}

public static Set<String> getAllUniqueCourses(List<Student> students)
{
return students.stream()
.flatMap(student -> student.getCourses().stream())
.collect(Collectors.toCollection(HashSet::new));
}
}
public class main {
public static void main(String[] args) {
List<Student> students = new ArrayList<>();
Map<String, Integer> scores1 = new HashMap<>();
scores1.put("Math", 90);
scores1.put("Physics", 85);
Map<String, Integer> scores2 = new HashMap<>();
scores2.put("Math", 70);
scores2.put("Chemistry", 95);
Map<String, Integer> scores3 = new HashMap<>();
scores3.put("Physics", 88);

scores3.put("Chemistry", 76);
students.add(new Student(1, "Alice",
Arrays.asList("Math", "Physics"), scores1));
students.add(new Student(2, "Bob",
Arrays.asList("Math", "Chemistry"), scores2));
students.add(new Student(3, "Charlie",
Arrays.asList("Physics", "Chemistry"), scores3));
System.out.println("Top 2 Students:");
System.out.println(StudentPerformanceAnalyzer.getTopNStudents(students,
2));
System.out.println("\nAverage Score Per Course:");
System.out.println(StudentPerformanceAnalyzer.getAverageScorePerCourse(stu
dents));
System.out.println("\nAll Unique Courses:");
System.out.println(StudentPerformanceAnalyzer.getAllUniqueCourses(students
));
}
}
