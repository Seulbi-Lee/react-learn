const Schedule = ()=> {
  console.log('schedule component')
  return (
    <>
      <div className="schedule-new">
        <input type="text" className="schedule-input" placeholder="new note"/>
        <button type="button" className="schedule-add-btn">+</button>
      </div>
      
      <ul className="schedule-list">
        <li className="schedule-item">
          <span className="schedule-content">Headbuttt a lion</span>
          <button type="button" className="schedule-delete">x</button>
        </li>
        <li className="schedule-item">
          <span className="schedule-content">Headbuttt a lion</span>
          <button type="button" className="schedule-delete">x</button>
        </li>
      </ul>
    </>
  );
}

export default Schedule;