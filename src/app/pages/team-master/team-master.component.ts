import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService, TeamRow } from '../../services/team.service';

@Component({
  selector: 'app-team-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-master.component.html',
  styleUrl: './team-master.component.scss',
})
export class TeamMasterComponent implements OnInit {

  mode: 'list' | 'edit' | 'add' = 'list';

  searchText = '';

  teams: TeamRow[] = [];

  selectedTeam: TeamRow = this.initializeForm();

  teamForm !: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamCode: ['', Validators.required],
      status: ['Active', Validators.required],
    })
    console.log('Team Master Loaded');
    this.getTeams();
  }

  saveTeam(): void {

    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
      alert("Please fill all required fields");
      return;
    }

    const payload = this.teamForm.value;

    const request = this.mode === 'edit' && this.selectedTeam?.id
      ? this.teamService.updateTeam(this.selectedTeam.id, payload)
      : this.teamService.addTeam(payload);

    request.subscribe({
      next: () => {
        alert("Team Saved Successfully");
        this.getTeams();
        this.backToList();
      },
      error: (error: any) => {
        console.log(error);
        alert(error?.error?.message || error?.message || "Failed to save team");
      }
    });

  }

  getTeams(): void {
    this.teamService.getTeams().subscribe({
      next: (response) => this.teams = response,
      error: (error: any) => console.log(error)
    });
  }

  deleteTeam(id: string): void {

    if (!confirm("Are you sure you want to delete this team?")) {
      return;
    }

    this.teamService.deleteTeam(id).subscribe({
      next: () => {
        this.getTeams();
        alert("Team Deleted Successfully");
      },
      error: (error: any) => {
        console.log(error);
        alert(error?.error?.message || error?.message || "Failed to delete team");
      }
    });

  }

  initializeForm(): TeamRow {
    return {
      id: 'TM-' + String(this.teams.length + 1).padStart(3, '0'),
      teamName: '',
      teamCode: '',
      status: 'Active'
    };
  }

  openAdd(): void {
    this.selectedTeam = this.initializeForm();
    this.teamForm.reset({
      teamName: '',
      teamCode: '',
      status: 'Active'
    });
    this.mode = 'add';
  }

  openView(team: TeamRow): void {
    this.selectedTeam = { ...team };
    this.teamForm.patchValue({
      teamName: team.teamName,
      teamCode: team.teamCode,
      status: team.status
    });
    this.mode = 'edit';
  }

  backToList(): void {
    this.mode = 'list';
  }

  filteredTeams(): TeamRow[] {
    return this.teams.filter(team =>
      team.teamName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      team.teamCode.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  report(): void {
    window.print();
  }

  goBackToUserMaster(): void {
    this.router.navigate(['/user-master-login']);
  }

}