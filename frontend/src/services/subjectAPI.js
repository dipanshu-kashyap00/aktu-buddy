import api from './api';

export const getSubjectsBySemester = (branch, semester) =>
  api.get(`/subjects/branch/${encodeURIComponent(branch)}/semester/${semester}`);

export const getSubjectByCode = (code) =>
  api.get(`/subjects/${code}`);

export const searchSubjects = (query) =>
  api.get(`/subjects?search=${encodeURIComponent(query)}`);