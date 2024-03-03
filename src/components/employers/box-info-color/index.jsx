import "./box-info-color.scss";
function BoxInfoColor({ desc, color, bgColor, value, icon }) {

  return (
    <div className="box-info-color" style={{ backgroundColor: bgColor }}>
      <div className="box-info-color__row" >
        <div className="box-content">
          <h4 style={{ color: color }}>{value}</h4>
          <p style={{ color: color }}>{desc}</p>
        </div>
        <div className="box-icon">
          <span style={{color:color}}>{icon}</span>
        </div>
      </div>
    </div>
  );
}
export default BoxInfoColor;
