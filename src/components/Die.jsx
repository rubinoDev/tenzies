export function Die(props){

  return(
      <div 
      className={props.isHeld ? "die held" : "die"}
      onClick={()=>props.holdDice(props.id)}
      >
          <p className="die__number">{props.number}</p>
      </div>

  )
}