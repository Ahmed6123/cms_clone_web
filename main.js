const output = document.querySelector('#output');
const button = document.querySelector('#get-courses-btn');

async function getCourses() {
    try {
        const res = await fetch('http://localhost:8080/courses');
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        const courses = await res.json();
        console.log(courses);
        output.innerHTML = '';

        courses.forEach((course) => {
            const courseEl = document.createElement('div');
            courseEl.textContent = course.code;
            output.appendChild(courseEl);
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

button.addEventListener('click', getCourses);
