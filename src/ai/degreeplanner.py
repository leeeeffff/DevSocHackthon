from request import fetch_comp_courses
import openai
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense

core_courses_prerequisites = {
    "COMP1511": {"prerequisite": []},
    "COMP1521": {"prerequisite": ["COMP1511"]},
    "COMP1531": {"prerequisite": ["COMP1511"]},
    "COMP2511": {"prerequisite": ["COMP1531", "COMP2521"]},
    "COMP2521": {"prerequisite": ["COMP1511"]},
    "COMP3900": {"prerequisite": ["COMP1531", "COMP2521"]},
    "COMP4920": {"prerequisite": ["COMP3900"]},
    "MATH1081": {"prerequisite": []},
    "MATH1131": {"prerequisite": []},
    "MATH1231": {"prerequisite": ["MATH1131"]},
}

def preprocess_courses(courses):
    course_codes = [course['course_code'] for course in courses]
    course_mapping = {course_code: idx for idx, course_code in enumerate(course_codes)}
    course_sequences = [course_mapping[course_code] for course_code in course_codes]
    return course_sequences, course_mapping

def create_rnn_model(vocab_size, embedding_dim=32, rnn_units=64):
    model = Sequential([
        Embedding(vocab_size, embedding_dim),
        LSTM(rnn_units, return_sequences=True),
        LSTM(rnn_units),
        Dense(vocab_size, activation='softmax')
    ])
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
    return model

def train_model(model, course_sequences, epochs=200):
    X = np.array(course_sequences[:-1]).reshape((len(course_sequences) - 1, 1))
    y = np.array(course_sequences[1:])
    model.fit(X, y, epochs=epochs)

def prerequisites_met(course_code, completed_courses):
    return all(prerequisite in completed_courses for prerequisite in core_courses_prerequisites[course_code]["prerequisite"])

def generate_course_plan_with_prerequisites_and_terms(courses_data, num_courses_per_term=3):
    course_plan = {"T1": [], "T2": [], "T3": []}
    completed_courses = []

    for course in courses_data:
        course_code = course['course_code']
        terms = course['terms']

        if course_code in core_courses_prerequisites:
            if not core_courses_prerequisites[course_code]["prerequisite"] and "T1" in terms and len(course_plan["T1"]) < num_courses_per_term:
                course_plan["T1"].append(course_code)
                completed_courses.append(course_code)

    for term in ["T1", "T2", "T3"]:
        for course in courses_data:
            course_code = course['course_code']
            terms = course['terms']

            if course_code in core_courses_prerequisites and course_code not in completed_courses:
                if term in terms and prerequisites_met(course_code, completed_courses) and len(course_plan[term]) < num_courses_per_term:
                    course_plan[term].append(course_code)
                    completed_courses.append(course_code)

    return course_plan

courses_data = fetch_comp_courses()
course_sequences, course_mapping = preprocess_courses(courses_data)

vocab_size = len(course_mapping)
rnn_model = create_rnn_model(vocab_size)
train_model(rnn_model, course_sequences)

course_plan = generate_course_plan_with_prerequisites_and_terms(courses_data)

print("Course Plan:")
for term, courses in course_plan.items():
    print(f"{term} Courses: {', '.join(courses)}")
