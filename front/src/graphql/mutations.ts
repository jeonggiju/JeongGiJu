import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      name
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const RESTORE_ACCESS_TOKEN_MUTATION = gql`
  mutation restoreAccessToken {
    restoreAccessToken
  }
`;

export const CREATE_CHECKLIST_MUTATION = gql`
  mutation createCheckList(
    $createCheckListInput: CreateCheckListInput!
    $userId: String!
  ) {
    createCheckList(
      createCheckListInput: $createCheckListInput
      userId: $userId
    ) {
      id
      createdAt
      smoking
      anaerobic
      cardio
      studyTime
      wakeTime
      sleepTime
      diary
      weight
      user {
        id
      }
    }
  }
`;

export const REMOVE_CHECKLIST_MUTATION = gql`
  mutation RemoveCheckList($checkListId: String!) {
    removeCheckList(checkListId: $checkListId) {
      id
      createdAt
      wakeTime
      sleepTime
      studyTime
      smoking
      diary
      weight
      user {
        id
      }
    }
  }
`;
