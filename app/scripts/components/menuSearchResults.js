import React from "react";

function MenuSearchResults(props) {
  return (
    <div className="search-results">
      <ul>
        {props.results.slice(0, 4).map(item => {
          return (
            <li key={item._id}>
              <div className="item-container">
                <div className="column">
                  <img src={item.picture} />
                </div>
                <div className="column">
                  <p className="title">{item.name}</p>
                  <p className="description">{item.about}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MenuSearchResults;
