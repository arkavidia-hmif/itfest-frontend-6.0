import {UserRole} from "~/api/types";

const whitelist = ['/login', '/logout', '/visitor/register'];

export default function({ redirect, route, store }) {
  if (!checkWhitelist(route.path)) {
    const isLoggedIn = store.getters['auth/isLoggedIn'];
    if (!isLoggedIn) {
      redirect(`/login`);
    }
 else {
      const userRole = store.getters['auth/getUserRole'];
      switch (userRole) {
        case UserRole.VISITOR.toString():
          if (!route.path.startsWith('/visitor'))
            redirect('/visitor');
          break;
        case UserRole.TENANT.toString():
          if (!route.path.startsWith('/tenant'))
            redirect('/tenant');
          break;
        case UserRole.ADMIN.toString():
          if (!route.path.startsWith('/admin'))
            redirect('/admin');
          break;
      }
    }
  }
}

function checkWhitelist(path: string): boolean {
  return whitelist.reduce((acc: boolean, currentVal: string) => {
    return acc || path.startsWith(currentVal);
  }, false);
}
