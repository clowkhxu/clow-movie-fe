type NotificationSlice = {
  data: {
    conmunity: any[];
    individual: any[];
  };
  activeTab: "community" | "individual";
  loading: boolean;
  openNotification: boolean;
  error: boolean;
};

type GetNotifications = {
  limit: number;
  type: "community" | "individual";
  userId?: string | null;
  afterTime?: number | null;
};

type CreateNotification = {
  senderId: string;
  type: "community" | "individual";
  content: string;
  accessToken: string;
  userId?: string;
  href?: string;
  image?: string;
};

type NotificationCustom = {
  id: string;
  user_id: string | null;
  content: string;
  created_at: string | number;
  image: string | null;
  href: string | null;
  sender_name: string;
  sender_id: string;
};

type NotificationsProps = {
  notifications: NotificationCustom[];
  loading?: boolean;
};
