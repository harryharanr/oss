import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../../../../services/hospital.service';

@Component({
  selector: 'add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {

  hospitalLists;
  hospitalToBeUpdated;

  showForm = true;
  showTable = false;

  hospital = {
    hospitalName:'',
    hospitalEmail:''
  }

  newHospital = {
    newHospitalName:'',
    newHospitalEmail:'',
    newHospitalId:''
  }

  constructor(
    private hospitalService:HospitalService,
    private router:Router
  ) { }

  addHospital(hospital){
    this.hospitalService.addHospital(hospital).subscribe(data => {
        if(data.success){
          this.getHospitals();
          this.hospital = {
              hospitalName:'',
              hospitalEmail:''
          }
        }
    });
  }

  toggleStatus(hospital){
    this.hospitalService.toggleHospitalStatus(hospital).subscribe(data => {
      this.getHospitals();
    });
  }

  getHospitals(){
    this.hospitalService.getHospitals().subscribe(data => {
      this.hospitalLists = data.message;
            
      if(this.hospitalLists.length < 1){
        this.showTable = false;
      } else {
        this.showTable = true;
      }
    });
  }

  editHospital(id){
    this.showForm = false;
    this.hospitalService.getSingleHospital(id).subscribe(data => {
      this.newHospital.newHospitalName = data.message.hospitalName;
      this.newHospital.newHospitalEmail = data.message.hospitalEmail;
      this.newHospital.newHospitalId = data.message._id;
      //console.log(this.newHospital);
    });
  }

  updateHospital(hospital){
    this.hospitalService.updateHospital(hospital).subscribe(data => {
     this.showForm = true; 
     this.getHospitals();
    });
  }

  deleteHospital(id){
    this.hospitalService.deleteHospital(id).subscribe(data => {
      this.getHospitals();
    });
  }

  goBack(){
    this.showForm = true;
  }

  manageBranch(id){
    this.router.navigate(['superadmin/hospital/add-branch/',id]);
  }

  ngOnInit() {
    this.getHospitals();
  }

}
