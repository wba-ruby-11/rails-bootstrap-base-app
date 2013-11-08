function changecolor()
{
	
	/*document.getElementById("button1").style.background-color:#0077B5;*/
}

function hide_other_options()
{
	if(document.getElementById("radio1").checked)
	{
		/*alert("Employeed");*/
		document.getElementById("student1").style.display="none";
		document.getElementById("student2").style.display="none";
		document.getElementById("student3").style.display="none";
		document.getElementById("student4").style.display="none";


		document.getElementById("Job_Seeker1").style.display="none";
		document.getElementById("Job_Seeker2").style.display="none";
		document.getElementById("Job_Seeker3").style.display="none";
		document.getElementById("Job_Seeker4").style.display="none";
		document.getElementById("Job_Seeker5").style.display="none";


		document.getElementById("Employed1").style.display="";
		document.getElementById("Employed2").style.display="";
		document.getElementById("Employed3").style.display="";
		document.getElementById("Employed4").style.display="";
	}
	else if(document.getElementById("radio2").checked)
	{
		/*alert("Job Seeker");*/
		document.getElementById("student1").style.display="none";
		document.getElementById("student2").style.display="none";
		document.getElementById("student3").style.display="none";
		document.getElementById("student4").style.display="none";


		document.getElementById("Employed1").style.display="none";
		document.getElementById("Employed2").style.display="none";
		document.getElementById("Employed3").style.display="none";
		document.getElementById("Employed4").style.display="none";

		document.getElementById("Job_Seeker1").style.display="";
		document.getElementById("Job_Seeker2").style.display="";
		document.getElementById("Job_Seeker3").style.display="";
		document.getElementById("Job_Seeker4").style.display="";
		document.getElementById("Job_Seeker5").style.display="";

	}
	else if(document.getElementById("radio3").checked)
	{
		/*alert("Student");*/
		document.getElementById("Employed1").style.display="none";
		document.getElementById("Employed2").style.display="none";
		document.getElementById("Employed3").style.display="none";
		document.getElementById("Employed4").style.display="none";

		document.getElementById("Job_Seeker1").style.display="none";
		document.getElementById("Job_Seeker2").style.display="none";
		document.getElementById("Job_Seeker3").style.display="none";
		document.getElementById("Job_Seeker4").style.display="none";
		document.getElementById("Job_Seeker5").style.display="none";

		document.getElementById("student1").style.display="";
		document.getElementById("student2").style.display="";
		document.getElementById("student3").style.display="";
		document.getElementById("student4").style.display="";

	}
}