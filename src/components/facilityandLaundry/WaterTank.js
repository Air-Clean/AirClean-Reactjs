import WaterTankInformation from "./WaterTankInformation";

function WaterTank() {
  
    return(
        <>  
            <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>

                <div style={{display:'flex', width:'90%', height:'240px'}}>
                    
                    <WaterTankInformation/>
                    <div style={{width:'100%', height:'100%', display: "flex", justifyContent:'center'}}>
                        <div style={{width:'90%', backgroundColor:'red', height:'100%'}}>
                            222
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
    
  }
  
  
  export default WaterTank;