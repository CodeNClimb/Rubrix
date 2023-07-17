// Function to convert the rubric data to CSV format
function downloadToCSV() {
    const rows = [];
    
    // Add the headers to the rows array
    rows.push('"Question","Student Mark","Comment"');
    
    // Get all the question sections
    const questionSections = document.getElementsByClassName('q_section');
    
    // Iterate over each question section
    for (const section of questionSections) {
      const questionNumber = section.querySelector('h2').textContent;
    
      // Get the point and comment inputs for the current question section
      const pointInput = section.querySelector('input[type="number"]');
      const commentTextarea = section.querySelector('textarea');
    
      // Extract the values
      const point = pointInput.value;
      const comment = commentTextarea.value;
    
      // Add the values to a new row
      rows.push(`${questionNumber},${point},"${comment}"`);
    }
    
    // Combine all rows into a single CSV content
    const csvContent = rows.join('\n');
    
    // Create a temporary element to download the CSV file
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    link.setAttribute('download', 'rubric_data.csv');
    link.style.display = 'none';
    
    // Append the link to the document body and click it programmatically
    document.body.appendChild(link);
    link.click();
    
    // Clean up by removing the temporary element
    document.body.removeChild(link);
  }
  
  
  // Get the rubric-mark-view-container div
  const rubricContainer = document.getElementById('rubric-mark-view-container');
  
  