import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import path from 'path';
import { DashbordComponent } from './pages/dashbord/dashbord.component';

export const routes: Routes = [
    {
         path: '',redirectTo:'login',pathMatch:'full',
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashbord',
                component:DashbordComponent
            }
            

        ]

    }
    
];
