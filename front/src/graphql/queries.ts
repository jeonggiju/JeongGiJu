import { gql } from "apollo-boost";

export const GET_CHECKLISTS_BY_USER = gql`
  query GetCheckListsByUser($userId: String!) {
    findAllCheckList(userId: $userId) {
      id
      createdAt
      smoking
      exercise
      studyTime
      diary
      user {
        id
      }
    }
  }
`;
