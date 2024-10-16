import requests

API_URL = "https://graphql.csesoc.app/v1/graphql"

def fetch_comp_courses():
    query = """
    query {
       courses(where: {_or: [{course_code: {_like: "COMP%"}}, {course_code: {_like: "MATH%"}}]}) {
        course_code
        course_name
        uoc
        faculty
        terms
      }
    }
    """
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, json={"query": query}, headers=headers)

    if response.status_code == 200:
        data = response.json()
<<<<<<< HEAD
        return data['data']['courses']  # Return the course data
=======
        return data['data']['courses']
>>>>>>> 30bcfc8 (worked on landing page)
    else:
        raise Exception(f"Query failed: {response.status_code} - {response.text}")
