CREATE DATABASE sample;

USE sample;

CREATE TABLE student (
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  rollno INT(11) NOT NULL,
  cgpa FLOAT NOT NULL,
  PRIMARY KEY (id)
);

-- Insert some sample records
INSERT INTO student (firstname, lastname, rollno, cgpa) 
VALUES 
('John', 'Doe', 1, 9.0),
('Jane', 'Smith', 2, 8.0),
('Alice', 'Brown', 3, 7.5);
