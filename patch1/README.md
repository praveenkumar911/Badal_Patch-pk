# DASS-2022-23-Team-41 - Badal - Crowdsourcing Development

## Description

Badal is a platform, attempting to bridge the gap between NGOs and Corporations by building an integrated platform for solution building. The platform aims to allow crowd sourcing of developer work time from corporates to build technical solutions to curated set of problems from NGOs.

The platform is already under development and is currently being pilot tested for understanding the workflows and adjustments needed to be made. This project is to build a beta version of the platform with improvements to UI, workflows, and Git integrations. It shall be a from scratch code development effort but incorporating learnings from the ongoing pilots and existing platform.

## Profile of Users

There are three main class of users on the platform - Core, NGO, Corporate. For now, a high-level brief of the user classes is provided below, they will be further refined in the following weeks.

- **Core**: Meant as administrators of the platform, acting to onboard NGOs and corporates onto the platform, defining solutions and solution breakdowns for problems proposed by NGOs, and assessing and integrating work submitted by the corporate developers.
- **NGOs**: The problem provider for the platform and one of the end clients the platform is trying to cater to.
- **Corporates**: The supplier of developers for implementing the technical solutions designed by the core team and the other end client.

## Feature highlights

The developed system requires the following features:

### Frontend/UI:

1. Accept new NGO and Corporate user applications.
2. Accept new project applications.
3. Host project solution breakdowns.
4. Allow users to pick tasks to solve, track progress, and submit their solutions.
5. Host completed projects and solutions.

### Backend/API:

1. Integrate with GitLab, for the purposes of project tracking and repository management.
2. DBs for user information, project information, logs, etc.

## Usage Model and Diagrams (if any)

Fig. 1 shows the simplified workflow on the platform, NGOs shall liaise with RCTS, bringing in problem statement which require on field solutions. The center shall define a solution and break it down into different development modules (M1, M2, …, Mn). Volunteer developer teams from our corporate partners will then pick modules to work on based on dev. Skill requirements and submit their solutions (S1, S2, …, Sn) back to the center. These solutions go through a review process (R1, R2, …, Rn) by the center, modules with unsatisfactory solutions are once again restarted.  Once all modules are solved to satisfaction, the solutions are aggregated, and the developed solution is delivered back to the NGO.

![( ; v ;) Sorry links are broken](images/Badal-simplified-workflow.png?raw=true)
<p align="center"> <b> Fig 1. Badal Platform simplified workflow. </b> </p>