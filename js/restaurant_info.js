"use strict";var newMap,restaurant=void 0;function initMap(){fetchRestaurantFromURL(function(e,t){e?(console.error(e),DBHelper.toast("Could not download content from remote server")):(self.newMap=L.map("map",{center:[t.latlng.lat,t.latlng.lng],zoom:16,scrollWheelZoom:!1}),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1IjoiZGFscyIsImEiOiJjamtzb2R0bGMyMDM0M290ZHlrZmRoeDV4In0.igOloQQbIH9Ma-iX395tLQ",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(newMap),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.newMap))})}function fetchRestaurantFromURL(r){var e=getParameterByName("id");e?DBHelper.fetchRestaurantById(e,function(e,t){if(!(self.restaurant=t))return console.error(e),void r(e,null);fillRestaurantHTML(),r(null,t)}):(error="No restaurant id in URL",r(error,null))}function fillRestaurantHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant;document.querySelector(".restaurant-name").innerHTML=e.name,document.querySelector(".restaurant-address").innerHTML=e.address,document.querySelector("#restaurant_id").value=e.id;var t=document.querySelector(".restaurant-img");(t.className="restaurant-img",t.alt="image of "+e.name+" restaurant",t.src=DBHelper.imageUrlForRestaurant(e),document.querySelector(".restaurant-cuisine").innerHTML=e.cuisine_type,e.is_favorite)&&(document.querySelector(".red-heart-checkbox").checked=JSON.parse(e.is_favorite));e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()}function fillRestaurantHoursHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,t=document.querySelector(".restaurant-hours");for(var r in e){var n=document.createElement("tr"),a=document.createElement("td");a.innerHTML=r,n.appendChild(a);var o=document.createElement("td");o.innerHTML=e[r],n.appendChild(o),t.appendChild(n)}}function fillReviewsHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews,t=document.querySelector(".reviews-container"),r=document.createElement("h2");if(r.innerHTML="Reviews",t.appendChild(r),showAddReviewHTML(),!e){var n=document.createElement("p");return n.innerHTML="No reviews yet!",void t.appendChild(n)}var a=document.querySelector(".reviews-list");e.forEach(function(e){a.appendChild(createReviewHTML(e))}),t.appendChild(a)}function createReviewHTML(e){var t=document.createElement("li"),r=document.createElement("div");r.className="review-header",t.appendChild(r);var n=document.createElement("span");n.className="reviewer",n.innerHTML=e.name,r.appendChild(n);var a=document.createElement("span");a.className="review-date",a.innerHTML=new Date(e.updatedAt).toDateString(),r.appendChild(a);var o=document.createElement("div");o.className="review-body",t.appendChild(o);var c=document.createElement("span");c.className="review-rating",c.innerHTML="Rating: "+e.rating,o.appendChild(c);var i=document.createElement("p");return i.innerHTML=e.comments,o.appendChild(i),t}function fillBreadcrumb(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant,t=document.querySelector(".breadcrumb"),r=document.createElement("li");r.innerHTML=e.name,t.appendChild(r)}function showAddReviewHTML(){document.querySelector("#addReview").className="show"}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}function favorite(){var e=document.querySelector("#restaurant_id").value;DBHelper.toggleFavorite(e).then(function(){DBHelper.toast("Updated!")})}function clearForm(){document.querySelector("#name").value="",document.querySelector("input[name=rating]:checked").checked=!1,document.querySelector("#comments").value=""}document.addEventListener("DOMContentLoaded",function(e){initMap()}),document.querySelector(".red-heart-checkbox").addEventListener("click",function(e){favorite()}),document.querySelector("#addReview").addEventListener("submit",function(e){e.preventDefault();var t=document.querySelector("#name").value,r=document.querySelector("input[name=rating]:checked").value,n=document.querySelector("#comments").value,a=document.querySelector("#restaurant_id").value,o={restaurant_id:parseInt(a),name:t,rating:r,comments:n,createdAt:(new Date).getTime(),updatedAt:(new Date).getTime()};DBHelper.saveReview(o).then(function(){fetchRestaurantFromURL(function(e,t){e?console.error(e):(DBHelper.toast("Added review successfully"),clearForm())})})});