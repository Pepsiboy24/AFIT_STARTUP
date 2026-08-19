'use client';

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import InputField from '@/components/InputField';
import SubmitButton from '@/components/SubmitButton';
import {
  createProperty,
  type PropertyActionState,
  type PropertyRecord,
} from '@/app/actions/property';

export default function CreatePropertyForm({
  onCreated,
}: {
  onCreated?: (property: PropertyRecord) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<PropertyActionState, FormData>(
    (_prevState, formData) => createProperty(formData),
    undefined,
  );

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      if (state.property) {
        onCreated?.(state.property);
      }
    }
  }, [state, onCreated]);

  return (
    <form ref={formRef} action={formAction} className="space-y-stack-md" id="create-listing">
      {state?.error ? (
        <p role="alert" className="rounded-xl bg-error-container px-4 py-3 text-body-sm font-medium text-on-error-container">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p role="status" className="rounded-xl bg-secondary-container px-4 py-3 text-body-sm font-medium text-on-secondary-container">
          Property listed successfully!
        </p>
      ) : null}
      <InputField label="Title" name="title" icon="home" placeholder="Modern 2-bed near campus" required minLength={5} />
      <label className="space-y-2 text-body-md text-on-surface">
        <span className="text-label-md font-semibold text-on-surface-variant">Description</span>
        <textarea
          name="description"
          rows={4}
          placeholder="Describe the property..."
          className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Price (per month)" name="price" icon="payments" placeholder="450" type="number" min={1} step="0.01" required />
        <InputField label="Distance from campus (km)" name="distance_from_campus" icon="map" placeholder="Optional" type="number" min={0} step="0.1" />
      </div>
      <InputField label="Location" name="location" icon="location_on" placeholder="Agbowo, Ibadan" required minLength={2} />
      <InputField label="Amenities (comma separated)" name="amenities" icon="checklist" placeholder="WiFi, Laundry, Parking" />
      <label className="space-y-2 text-body-md text-on-surface">
        <span className="text-label-md font-semibold text-on-surface-variant">Images</span>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
        />
      </label>
      <SubmitButton className="w-full">Publish listing</SubmitButton>
    </form>
  );
}
