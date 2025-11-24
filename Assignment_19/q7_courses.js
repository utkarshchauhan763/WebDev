// Q7 - Search Courses
$(document).ready(function() {
  
  const courses = $('.course-item');
  const totalCourses = courses.length;
  
  // 1. Search input filters courses in real-time using .keyup()
  $('#searchInput').keyup(function() {
    const searchTerm = $(this).val().toLowerCase().trim();
    
    if (searchTerm === '') {
      // Show all courses if search is empty
      resetSearch();
      return;
    }
    
    let matchCount = 0;
    
    // Filter courses
    courses.each(function() {
      const courseItem = $(this);
      
      // Get all searchable text
      const title = courseItem.find('.course-title').text().toLowerCase();
      const description = courseItem.find('.course-description').text().toLowerCase();
      const meta = courseItem.find('.course-meta').text().toLowerCase();
      const keywords = courseItem.data('keywords').toLowerCase();
      
      const allText = title + ' ' + description + ' ' + meta + ' ' + keywords;
      
      if (allText.includes(searchTerm)) {
        // 2. Highlight matched text using .css()
        highlightText(courseItem, searchTerm);
        
        // 3. Show courses that match search
        courseItem.removeClass('hidden');
        matchCount++;
      } else {
        // 3. Toggle visibility of courses not matching search
        courseItem.addClass('hidden');
      }
    });
    
    // 4. Show count of matched courses dynamically
    updateMatchCount(matchCount);
  });
  
  // 2. Highlight matched text using .css()
  function highlightText(courseItem, searchTerm) {
    // Remove previous highlights
    courseItem.find('.highlight').contents().unwrap();
    
    // Highlight in title
    const titleElement = courseItem.find('.course-title');
    const titleHtml = titleElement.html();
    const titleRegex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    const highlightedTitle = titleHtml.replace(titleRegex, '<span class="highlight">$1</span>');
    titleElement.html(highlightedTitle);
    
    // Highlight in description
    const descElement = courseItem.find('.course-description');
    const descHtml = descElement.html();
    const highlightedDesc = descHtml.replace(titleRegex, '<span class="highlight">$1</span>');
    descElement.html(highlightedDesc);
  }
  
  // Helper function to escape special regex characters
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  
  // 4. Update match count
  function updateMatchCount(count) {
    if (count === 0) {
      $('#noResults').addClass('show');
      $('#matchCount').text('No matches found');
    } else {
      $('#noResults').removeClass('show');
      $('#matchCount').text(`Showing ${count} of ${totalCourses} courses`);
    }
  }
  
  // 5. Clear search → reset list to show all courses
  $('#clearBtn').click(function() {
    $('#searchInput').val('');
    resetSearch();
  });
  
  function resetSearch() {
    // Remove all highlights
    courses.find('.highlight').contents().unwrap();
    
    // Show all courses
    courses.removeClass('hidden');
    
    // Hide no results message
    $('#noResults').removeClass('show');
    
    // Update count
    $('#matchCount').text(`Showing all ${totalCourses} courses`);
  }
  
});
