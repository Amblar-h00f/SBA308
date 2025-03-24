// objectives:
//Employ basic JavaScript syntax accurately
//Implement control flow structures such as conditionals and loops effectively.
//use arrays and objects to organize and manage data.
//develope functions to create reusable code.
//utilize loops and iteration to navigate through data collections
//implement error handling to manage potentional code failures gracefully.
/*Requiremets:
Declare variables properly using let and const where appropriate.
Use operators to perform calculations on variables and literals
Use strings, numbers, and Boolean values cached within variables.
Use at least two if/else statements to control program flow. Optionally, use at least one switch statement
Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program.
Utilize at least two different types of loops.
Utilize at least one loop control keyword such as break or continue
Create and/or manipulate arrays and objects
Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object
Use functions to handle repeated tasks
Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior.
Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
Commit frequently to the git repository.
Include a README file that contains a description of your application.*/



// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
  
  {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      }
    ]
}
const AssignmentInfo = [
    {
    id: 125,
    name: "Fundamentals of JavaScript",
    due_at: "2025-03-17",
    points_possible: 500,
    },
    {
    id: 132,
    name: "Fundamentals of JavaScript",
    due_at: "2025-03-17",
    points_possible: 500,
    }
]
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, avg, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  {
  const _result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions,AssignmentInfo,);
  
  console.log(_result);


  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    // Validate course-assignment group relationship
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw new Error("Invalid input: Assignment group doesn't belong to this course");
    }

    // Create learner data structure
    const learners = new Map();

    // Helper function to process each submission
    function processSubmission(submission) {
        try {
            const assignment = AssignmentGroup.assignments.find(a => a.id === submission.assignment_id);
            if (!assignment) {
                console.warn(`Skipping unknown assignment ${submission.assignment_id}`);
                return;
            }

            // Date validation
            const dueDate = new Date(assignment.due_at);
            const currentDate = new Date();
            if (dueDate > currentDate) return; // Skip non-due assignments

            // Numeric validation
            const pointsPossible = Number(assignment.points_possible);
            if (isNaN(pointsPossible) || pointsPossible <= 0) {
                throw new Error(`Invalid points possible: ${assignment.points_possible}`);
            }

            const rawScore = Number(submission.submission.score);
            if (isNaN(rawScore)) {
                throw new Error(`Invalid score format: ${submission.submission.score}`);
            }

            // Late penalty calculation
            const submittedDate = new Date(submission.submission.submitted_at);
            let adjustedScore = rawScore;
            if (submittedDate > dueDate) {
                const penalty = pointsPossible * 0.1;
                adjustedScore = Math.max(adjustedScore - penalty, 0);
            }

            // Calculate percentage score
            const percentage = (adjustedScore / pointsPossible) * 100;

            // Update learner record
            const learnerId = submission.learner_id;
            if (!learners.has(learnerId)) {
                learners.set(learnerId, {
                    totalScore: 0,
                    totalPossible: 0,
                    scores: {}
                });
            }

            const learner = learners.get(learnerId);
            learner.totalScore += adjustedScore;
            learner.totalPossible += pointsPossible;
            learner.scores[submission.assignment_id] = Number(percentage.toFixed(2));
            
        } catch (error) {
            console.error(`Error processing submission (Learner ${submission.learner_id}):`, error.message);
        }
    }

    // Process all submissions
    LearnerSubmissions.forEach(processSubmission);

    // Generate final output
    return Array.from(learners.entries()).map(([id, data]) => ({
        id,
        avg: data.totalPossible > 0 
            ? Number(((data.totalScore / data.totalPossible) * 100).toFixed(2))
            : 0,
        ...data.scores
    }));
}

// Example usage with your data
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
const result =[
[
    {
        id: 125,
        avg: 98.5,
        1: 94.00,
        2: 100.00
    },
    {
        id: 132,
        avg: 82.00,
        1: 78.00,
        2: 83.33
    }
],

/*{
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
}
// code prints out duplicate identical arrays
  
