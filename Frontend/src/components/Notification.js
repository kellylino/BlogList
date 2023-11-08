const Notification = (pros) => {
  if(pros.notification === null) {
    return null
  }

  return (
    <div className={pros.classname}> {pros.notification} </div>
  )
}

export default Notification