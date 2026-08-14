import random

QUESTION_BANK = {

    "python": [

        "What are Python decorators?",
        "Explain generators in Python.",
        "Difference between list and tuple.",
        "Difference between list and set.",
        "What is a dictionary in Python?",
        "Explain lambda functions.",
        "What are *args and **kwargs?",
        "Difference between deep copy and shallow copy.",
        "Explain exception handling.",
        "What is the use of try-except?",
        "Difference between append() and extend().",
        "Explain list comprehension.",
        "What are modules and packages?",
        "What is __name__ == '__main__'?",
        "Explain Python OOP concepts.",
        "Difference between class and object.",
        "What are inheritance and polymorphism?",
        "Explain encapsulation.",
        "What is multithreading?",
        "Difference between process and thread.",
        "Explain file handling in Python.",
        "What is virtual environment?",
        "What is pip?",
        "Difference between NumPy array and Python list.",
        "What are f-strings?"
    ],

    "sql": [

        "Difference between INNER JOIN and LEFT JOIN.",
        "Explain RIGHT JOIN.",
        "What is FULL OUTER JOIN?",
        "What is normalization?",
        "Explain denormalization.",
        "What is a primary key?",
        "What is a foreign key?",
        "Difference between DELETE, DROP and TRUNCATE.",
        "Explain GROUP BY.",
        "Difference between WHERE and HAVING.",
        "What is ORDER BY?",
        "What are aggregate functions?",
        "Explain COUNT(), SUM() and AVG().",
        "What are indexes?",
        "Difference between clustered and non-clustered index.",
        "What are views?",
        "What are stored procedures?",
        "Explain ACID properties.",
        "What is a transaction?",
        "Difference between UNION and UNION ALL."
    ],

    "machine learning": [

        "What is Machine Learning?",
        "Difference between supervised and unsupervised learning.",
        "Explain classification.",
        "Explain regression.",
        "What is overfitting?",
        "What is underfitting?",
        "How do you prevent overfitting?",
        "Explain train-test split.",
        "What is cross validation?",
        "Difference between bias and variance.",
        "What is feature engineering?",
        "What is feature scaling?",
        "Difference between normalization and standardization.",
        "Explain confusion matrix.",
        "What is precision?",
        "What is recall?",
        "Explain F1-score.",
        "What is ROC-AUC?",
        "Difference between bagging and boosting.",
        "Explain Random Forest."
    ],

    "deep learning": [

        "What is Deep Learning?",
        "What is an Artificial Neural Network?",
        "Explain activation functions.",
        "What is ReLU?",
        "Difference between CNN and RNN.",
        "What is backpropagation?",
        "Explain gradient descent.",
        "What is dropout?",
        "What are epochs?",
        "What is batch size?"
    ],

    "fastapi": [

        "What is FastAPI?",
        "Explain APIRouter.",
        "Difference between GET and POST.",
        "Difference between PUT and PATCH.",
        "What is dependency injection?",
        "What is Pydantic?",
        "Explain request validation.",
        "What is CORS?",
        "Explain middleware.",
        "How do you connect FastAPI with SQLAlchemy?"
    ],

    "pandas": [

        "What is Pandas?",
        "Difference between Series and DataFrame.",
        "Explain loc and iloc.",
        "How do you handle missing values?",
        "What is dropna()?",
        "What is fillna()?",
        "Explain merge().",
        "Difference between merge and concat.",
        "Explain groupby().",
        "What is apply()?"
    ],

    "numpy": [

        "What is NumPy?",
        "Difference between list and ndarray.",
        "Explain broadcasting.",
        "What is vectorization?",
        "Explain reshape().",
        "Difference between zeros() and ones().",
        "What is numpy array slicing?",
        "Explain random module.",
        "What is axis in NumPy?",
        "Explain mean() and std()."
    ],

    "java": [

        "What is JVM?",
        "Difference between JDK and JRE.",
        "Explain OOP concepts in Java.",
        "Difference between interface and abstract class.",
        "What is method overloading?",
        "What is method overriding?",
        "Explain exception handling.",
        "What is multithreading?",
        "What is Collection Framework?",
        "Difference between ArrayList and LinkedList."
    ],

    "react": [

        "What is React?",
        "What is JSX?",
        "Difference between state and props.",
        "Explain useState().",
        "Explain useEffect().",
        "What is Virtual DOM?",
        "What are components?",
        "Difference between functional and class components.",
        "Explain React Router.",
        "How do you pass data between components?"
    ],

    "git": [

        "What is Git?",
        "Difference between Git and GitHub.",
        "Explain git clone.",
        "Explain git pull.",
        "Explain git push.",
        "Explain git commit.",
        "What is branching?",
        "What is merge?",
        "What is rebase?",
        "How do you resolve merge conflicts?"
    ],

    "github": [

        "What is GitHub?",
        "Difference between public and private repository.",
        "Explain pull request.",
        "Explain fork.",
        "What is GitHub Actions?"
    ]

}


def generate_questions(skills):

    selected_questions = []

    # Valid skills only
    valid_skills = []

    for skill in skills:

        skill = skill.lower()

        if skill in QUESTION_BANK:

            valid_skills.append(skill)

    # Shuffle skills
    random.shuffle(valid_skills)

    # Maximum 5 skills
    valid_skills = valid_skills[:5]

    # One random question from each skill
    for skill in valid_skills:

        question = random.choice(QUESTION_BANK[skill])

        selected_questions.append(question)

    # Fill remaining questions (if less than 5 skills found)
    while len(selected_questions) < 5:

        random_skill = random.choice(list(QUESTION_BANK.keys()))

        question = random.choice(QUESTION_BANK[random_skill])

        if question not in selected_questions:

            selected_questions.append(question)

    random.shuffle(selected_questions)

    return selected_questions