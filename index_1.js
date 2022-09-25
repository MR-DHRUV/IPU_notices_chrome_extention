const usct = async () => {
    settittle("University School of Chemical Technology");
    getUSS("http://ipu.ac.in/notices_usct.php")
}

const usbt = async () => {
    settittle("University School of Biotechnology");
    getUSS("http://ipu.ac.in/notices_usbt.php")
}

const usbas = async () => {
    settittle("University School of Basic & Applied Sciences");
    getUSS("http://ipu.ac.in/notices_usbas.php")
}

const uslls = async () => {
    settittle("University School of Law and Legal Studies");
    getUSS("http://ipu.ac.in/notices_USLLS.php")
}

const usap = async () => {
    settittle("University School of Architecture & Planing");
    getUSS("http://ipu.ac.in/exam_notices.php")
}

const usmphs = async () => {
    settittle("University School of Medicine and Para-Medical Health Sciences");
    getUSS("http://ipu.ac.in/usmphs/notices.php")
}

const usmc = async () => {
    settittle("University School of Mass Communication");
    getUSS("http://ipu.ac.in/notices_usmc.php")
}


<li><button onClick={usct}>USCT</button></li>
<li><button onClick={usbt}>USBT</button></li>
<li><button onClick={usbas}>USBAS</button></li>
<li><button onClick={uslls}>USLLS</button></li>
<li><button onClick={usap}>USAP</button></li>
<li><button onClick={usmphs}>USMPHS</button></li>
<li><button onClick={usmc}>USMC</button></li>