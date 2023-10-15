import "@google/model-viewer";

function Model (props) {
 
  const defaultModel = "Astronaut";
  return( 
 <div id="card">
    <model-viewer
      src={`../assets/${props.model!="" ? props.model : defaultModel }.glb`}
      ios-src=""
      poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
      alt="A 3D model of an astronaut"
      shadow-intensity="1"
      camera-controls
      auto-rotate
      ar
      ar-modes="webxr scene-viewer quick-look"
      disable-zoom
      camera-orbit="0deg 105deg 2.5m"
      camera-target="0.00001651m 0.3m -0.03895m"
      min-camera-orbit="auto 81deg auto"
      max-camera-orbit="auto 81deg auto"
    ></model-viewer>
  </div>
  )

};

export default Model;
