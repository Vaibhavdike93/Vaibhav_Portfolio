-- ============================================================
--  my_portfolio — Database Setup
--  Run this in phpMyAdmin or MySQL CLI before starting the app
-- ============================================================

CREATE DATABASE IF NOT EXISTS my_portfolio;
USE my_portfolio;

-- Profile
CREATE TABLE IF NOT EXISTS profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    title VARCHAR(150),
    bio TEXT,
    email VARCHAR(100),
    phone VARCHAR(30),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT DEFAULT 80,
    category VARCHAR(100),
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    tech VARCHAR(255),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Education
CREATE TABLE IF NOT EXISTS education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    degree VARCHAR(200) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    year VARCHAR(50),
    grade VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Optional: Seed sample data
-- ============================================================

INSERT INTO profile (name, title, bio, email, github)
VALUES (
    'Your Name',
    'Full Stack Web Developer',
    'I am a passionate full stack developer skilled in building dynamic, responsive web applications. I love crafting clean code and elegant user experiences.',
    'youremail@example.com',
    'https://github.com/yourusername'
);

INSERT INTO skills (name, level, category) VALUES
('HTML5', 90, 'Frontend'),
('CSS3', 85, 'Frontend'),
('JavaScript', 80, 'Frontend'),
('Node.js', 75, 'Backend'),
('Express.js', 75, 'Backend'),
('MySQL', 70, 'Database'),
('EJS', 80, 'Frontend'),
('Bootstrap', 85, 'Frontend');

INSERT INTO education (degree, institution, year, grade) VALUES
('Bachelor of Computer Application (BCA)', 'Your University', '2022 – 2025', '8.5 CGPA'),
('Higher Secondary Certificate (HSC)', 'Your College', '2020 – 2022', '85%'),
('Secondary School Certificate (SSC)', 'Your School', '2019 – 2020', '90%');
