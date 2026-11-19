"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { Check, X, Trash2, Power, Shield } from "lucide-react";
import {
  approveReview,
  unapproveReview,
  deleteReview,
  toggleRoomActive,
  deleteRoom,
  toggleTourActive,
  deleteTour,
  toggleBlogPublished,
  deleteBlogPost,
  updateProfileRole,
} from "../_actions";

export function ReviewActions({ id, isApproved }: { id: number; isApproved: boolean }) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("admin.actions");

  return (
    <div className="flex items-center justify-end gap-2">
      {isApproved ? (
        <button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await unapproveReview(id);
            });
          }}
          className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-muted hover:border-star hover:text-star disabled:opacity-50"
          title={t("unapprove")}
        >
          <X className="h-3.5 w-3.5" />
          <span>{t("unapprove")}</span>
        </button>
      ) : (
        <button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await approveReview(id);
            });
          }}
          className="inline-flex items-center gap-1 rounded-lg bg-success/10 px-2.5 py-1 text-xs font-medium text-success hover:bg-success/20 disabled:opacity-50"
          title={t("approve")}
        >
          <Check className="h-3.5 w-3.5" />
          <span>{t("approve")}</span>
        </button>
      )}
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm(t("deleteConfirm"))) {
            startTransition(async () => {
              await deleteReview(id);
            });
          }
        }}
        className="rounded-lg p-1 text-ink-muted hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
        title={t("delete")}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function RoomRowActions({ id, isActive }: { id: number; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("admin.actions");

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await toggleRoomActive(id, !isActive);
          });
        }}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
          isActive
            ? "bg-success/10 text-success hover:bg-success/20"
            : "bg-surface-soft text-ink-muted hover:bg-surface-raised"
        }`}
      >
        <Power className="h-3.5 w-3.5" />
        <span>{isActive ? t("deactivate") : t("activate")}</span>
      </button>
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm(t("deleteConfirm"))) {
            startTransition(async () => {
              await deleteRoom(id);
            });
          }
        }}
        className="rounded-lg p-1 text-ink-muted hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function TourRowActions({ id, isActive }: { id: number; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("admin.actions");

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await toggleTourActive(id, !isActive);
          });
        }}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
          isActive
            ? "bg-success/10 text-success hover:bg-success/20"
            : "bg-surface-soft text-ink-muted hover:bg-surface-raised"
        }`}
      >
        <Power className="h-3.5 w-3.5" />
        <span>{isActive ? t("deactivate") : t("activate")}</span>
      </button>
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm(t("deleteConfirm"))) {
            startTransition(async () => {
              await deleteTour(id);
            });
          }
        }}
        className="rounded-lg p-1 text-ink-muted hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function BlogRowActions({ id, isPublished }: { id: number; isPublished: boolean }) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("admin.actions");

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await toggleBlogPublished(id, !isPublished);
          });
        }}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
          isPublished
            ? "bg-brand/10 text-brand hover:bg-brand/20"
            : "bg-surface-soft text-ink-muted hover:bg-surface-raised"
        }`}
      >
        <span>{isPublished ? t("unpublish") : t("publish")}</span>
      </button>
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm(t("deleteConfirm"))) {
            startTransition(async () => {
              await deleteBlogPost(id);
            });
          }
        }}
        className="rounded-lg p-1 text-ink-muted hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function UserRoleSelect({ id, currentRole }: { id: string; currentRole: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-2">
      <Shield className="h-3.5 w-3.5 text-ink-muted" />
      <select
        disabled={isPending}
        value={currentRole}
        onChange={(e) => {
          const newRole = e.target.value as "guest" | "admin" | "staff";
          startTransition(async () => {
            await updateProfileRole(id, newRole);
          });
        }}
        className="rounded-lg border border-line bg-surface px-2 py-1 text-xs font-medium text-ink focus:border-brand focus:outline-none"
      >
        <option value="guest">guest</option>
        <option value="staff">staff</option>
        <option value="admin">admin</option>
      </select>
    </div>
  );
}
