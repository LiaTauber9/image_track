const track = document.getElementById("image-track");

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt == 0) return;

    const mousDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,

    maxDelta = window.innerWidth /2;

    percentage = (mousDelta / maxDelta) * -100,

    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextPercentage = Math.min(Math.max(nextPercentage, -100), 0);

    track.dataset.percentage = nextPercentage;

    for(let image of track.getElementsByClassName("image")) {
        image.animate(
            {objectPosition: `${nextPercentage + 100}% 50%`}, 
            {
              duration: 1200,
              fill: "forwards"
            });
    }

    track.animate(
        {transform: `translate(${nextPercentage}%, -50%)`},
        {
          duration: 1200,
          fill: "forwards"
        }
    );
}

window.onmouseup = e => {
  track.dataset.mouseDownAt = "0"; 
  track.dataset.prevPercentage = track.dataset.percentage;  
}