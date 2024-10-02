<?php
$dbhost = "localhost";
$dbuser = "root";  // Replace with your MySQL username
$dbpass = "root@123";      // Replace with your MySQL password (or leave it blank if no password)
$dbname = "sample"; // Database name

// host: 'localhost',
// user: 'root',
// password: 'root@123',
// database: 'nodelogin'

// Establish the connection
$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// Check if the connection is successful
if ($con->connect_error) {
    exit('Could not connect to the database: ' . $con->connect_error);
}

// Check if the 'q' parameter is set and not empty
if (isset($_GET['q']) && !empty($_GET['q'])) {
    $cgpa = $_GET['q'];  // Get the 'q' parameter from the URL

    echo "Received CGPA: " . htmlspecialchars($cgpa) . "<br>";

    // Prepare a SQL query to avoid SQL injection
    $stmt = $con->prepare("SELECT * FROM student WHERE cgpa = ?");
    $stmt->bind_param("s", $cgpa);  // Bind the parameter (as string type)
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any rows are returned
    if ($result && $result->num_rows > 0) {
        echo "<table border='1' style='border-collapse:collapse;'>
                <tr>
                    <th style='padding:10px;'>FirstName</th>
                    <th style='padding:10px;'>LastName</th>
                    <th style='padding:10px;'>Rollno</th>
                    <th style='padding:10px;'>CGPA</th>
                </tr>";

        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td style='padding:10px;'>" . $row['firstname'] . "</td>
                    <td style='padding:10px;'>" . $row['lastname'] . "</td>
                    <td style='padding:10px;'>" . $row['rollno'] . "</td>
                    <td style='padding:10px;'>" . $row['cgpa'] . "</td>
                  </tr>";
        }

        echo "</table>";
    } else {
        echo "No records found for the CGPA: " . htmlspecialchars($cgpa);
    }

    // Close the prepared statement
    $stmt->close();
} else {
    echo "Please provide a valid CGPA.";
}

// Close the database connection
mysqli_close($con);
?>
