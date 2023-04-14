export type TResponse<TData = any | any[] | undefined> = {
  statusCode: number;
  message: string;
  data: TData;
};

/*   const status = (await this.usersService.isfriend(id, user.userId))
      ? 'accepter'
      : 'vous n avez pas d amis'; */
/*  { status: status, users: [updateUser, friend] }; */
/*  if (user.length>0) {
      newFriends = [...user.friends];
    }
    console.log(user.friends);
    console.log(newFriends); */
