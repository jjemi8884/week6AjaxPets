/**
 * A webpage for fetching cute pet photos. Puppies or kitties
 * will be populated on the page after the user selects their desired
 * pet type.
 * 
 * Important information to complete this assignment:
 * - Service URL: https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php
 * - Query Parameters (required): ?animal=<value>
 *   - Details: animal is the name of the query parameter you need to assign
 *              a value to. This API recognizes either a value of puppy or kitty.
 * 
 * Example Request (with puppy as the value):
 * https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=puppy
 */

"use strict";
(function() {

 
  const radiolist = document.getElementsByName("animal");
  window.addEventListener("load", init);

  
  function init() {
    radiolist.forEach(element => {
        element.addEventListener("input", makeRequest);
    });    
  }

  /**
   * TODO: Fetch data from the ajax pets api!
   */
  function makeRequest() {
    // TODO
    let animalType;
      if(radiolist[0].checked){
        animalType = "kitty";
      }else{
        animalType = "puppy";
      }
      fetch("https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal="+animalType)
        .then(statusCheck)
        .then(resp => resp.text())
        .then(processData)
        .catch(res => {
          throw new Error("System failure error did not load info "+res.Error );
        }

        )
    
  }

  function processData(resp){
    const pic = document.getElementById("pictures");
    let picArray = resp.split("\n");
    pic.innerHTML="";
    for(let i = 0; i < picArray.length -1 ; i++){
      pic.innerHTML += `<img src="${picArray[i]}" alt="bunch of cute kitties and puppies"/> `;
    }
  
  }


  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
