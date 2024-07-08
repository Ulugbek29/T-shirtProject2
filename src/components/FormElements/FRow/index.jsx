import cls from "./style.module.scss"


const FRow = ({ label,icon, children, position="vertical", required }) => {
  return (
    <div className={`${cls.frow} ${position}`} >
    <div className={cls.icon__label}>
      <div className={cls.label}> {required && <span className="requiredStart">*</span>} {label}:</div>
      {icon && <div>{icon}</div>}
    </div>
      <div className={cls.component}>{children}</div>
    </div>  
  )
}



export default FRow
