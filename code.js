function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"Bright_Future.jpg",
		audio:"https://firebasestorage.googleapis.com/v0/b/manisha-gift.appspot.com/o/%E0%A4%B5%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%81%E0%A4%A8%E0%A4%BF%E0%A4%B7%E0%A5%8D%E0%A4%A0%20%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%BF%E0%A4%A7%E0%A4%BE%E0%A4%A8%20%E0%A4%AD%E0%A4%BE%E0%A4%97%201.2.mp3?alt=media&token=b163087b-83bb-41b2-9949-9bf7ed67b719",
		songname:"Bright Future",
		artistname:"Silent Partner"
	},
	{
		thumbnail:"Bovi.jpg",
		audio:"Bovi.mp3",
		songname:"Bovi",
		artistname:"The Grand Affair",
	},
	{
		thumbnail:"Sunny_Looks_Good_on_You.jpg",
		audio:"Sunny_Looks_Good_on_You.mp3",
		songname:"Sunny Looks Good on You",
		artistname:"Midnight North",
	},
	{
		thumbnail:"Bright_Eyed_Blues.jpg",
		audio:"Bright_Eyed_Blues.mp3",
		songname:"Bright Eyed Blues",
		artistname:"Unicorn Heads",
	},
	{
		thumbnail:"How_it_Began.jpg",
		audio:"How_it_Began.mp3",
		songname:"How it Began",
		artistname:"Silent Partner",
	},
	{
		thumbnail:"Simon_s_Song.jpg",
		audio:"Simon_s_Song.mp3",
		songname:"Simon's Song",
		artistname:"Dan Lebowitz",
	},
	{
		thumbnail:"Scanline.jpg",
		audio:"Scanline.mp3",
		songname:"Scanline",
		artistname:"Mike Relm",
	},
	{
		thumbnail:"Flight_To_Tunisia.jpg",
		audio:"Flight_To_Tunisia.mp3",
		songname:"Flight To Tunisia",
		artistname:"Causmic",
	},
	{
		thumbnail:"Calimba.jpg",
		audio:"Calimba.mp3",
		songname:"Calimba",
		artistname:"E's Jammy Jams",
	},
	{
		thumbnail:"Everglow.jpg",
		audio:"Everglow.mp3",
		songname:"Everglow",
		artistname:"Patrick Patrikios",
	}
];

let currentSongIndex = 0;

let player = _(".player"),
	toggleSongList = _(".player .toggle-list");

let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control")
}

toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex){
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="./files/${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for(let i=0;i<songListItems.length;i++){
	songListItems[i].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}

function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src","./files/"+song.thumbnail);
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("./files/${song.thumbnail}") center no-repeat`;
	document.body.style.backgroundSize = "cover";	
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src","./files/"+song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		}
	})
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);

main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});
main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);
