class WarningNotifier {
    constructor() {
        this.observers = [];
        this.studentWarnings = {};
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(studentId) {
        const warnings = this.studentWarnings[studentId];
        this.observers.forEach(observer => observer.update(studentId, warnings));
    }

    async checkWarnings(studentId) {
        try {
            const res = await fetch('http://localhost:5000/student/mywarnings/' + studentId);
            if (!res.ok) {
                throw new Error('Failed to fetch warnings');
            }
            const warnings = await res.json();
            this.studentWarnings[studentId] = warnings;
            this.notifyObservers(studentId);
        } catch (error) {
            console.error('Error fetching warnings', error);
        }
    }
}


class ObserverInterface {
    constructor(outputElement) {
        this.outputElement = outputElement;
    }

    update(studentId, warnings) {
        if (warnings.length !== 0) {
            let HTML = `<a href="StudentWarning.html" id="warning-item">
            <i class='bx bx-error' ></i>
            <span class="text">Warnings</span>
        </a>`;
        this.outputElement.innerHTML = HTML;
    }
}}