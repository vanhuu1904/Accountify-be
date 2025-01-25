import { Routes } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { OrganizationStatisticsModule } from './modules/organizations/statistics/statistics.module';
import { OrganizationUsersModule } from './modules/organizations/users/users.module';
import { OrganizationRolesModule } from './modules/organizations/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { OrganizationInvoicesModule } from './modules/organizations/invoices/invoices.module';
import { OrganizationProjectsModule } from './modules/organizations/projects/projects.module';
import { OrganizationProjectBudgetsModule } from './modules/organizations/projects/budgets/budgets.module';
import { OrganizationProjectCategoriesModule } from './modules/organizations/projects/categories/categories.module';
import { OrganizationProjectInvoicesModule } from './modules/organizations/projects/invoices/invoices.module';
import { OrganizationProjectStatisticsModule } from './modules/organizations/projects/statistics/statistics.module';

export const routes: Routes = [
  // Internal APIs
  {
    path: '/internal/api/v1',
    module: OrganizationsModule,
    children: [
      {
        path: 'organizations/:organizationId',
        module: OrganizationStatisticsModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationUsersModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationRolesModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationInvoicesModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationProjectsModule,
        children: [
          {
            path: 'projects/:projectId',
            module: OrganizationProjectInvoicesModule,
          },
          {
            path: 'projects/:projectId',
            module: OrganizationProjectBudgetsModule,
          },
          {
            path: 'projects/:projectId',
            module: OrganizationProjectCategoriesModule,
          },
          {
            path: 'projects/:projectId',
            module: OrganizationProjectStatisticsModule,
          },
        ],
      },
    ],
  },

  {
    path: '/internal/api/v1',
    module: AuthModule,
  },
  {
    path: '/internal/api/v1',
    module: PermissionsModule,
  },
];
