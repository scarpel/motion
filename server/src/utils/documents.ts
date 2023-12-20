import { Document, Model } from 'mongoose';
import { TObject } from './others';

export function isValid(value: any) {
  if (typeof value === 'string') return !!value;

  return value ?? false;
}

export function updateDocumentFields(
  document: Document,
  fields: TObject,
  filterEmpty: boolean = true,
) {
  Object.keys(fields).forEach((key) => {
    const value = fields[key];

    if (!filterEmpty || isValid(value)) document[key] = value;
  });

  return document;
}

export async function getDocumentById<T>(model: Model<T>, id: string) {
  try {
    return await model.findById(id);
  } catch (err) {
    return null;
  }
}

export async function deleteCascade<T>(
  model: Model<T>,
  cascadeField: string,
  fieldValue: any,
) {
  const items = await model.find({
    [cascadeField as any]: fieldValue,
  });

  if (!items.length) return true;

  const descendingValues = [...new Set(items.map((item) => item._id))];

  await Promise.all([
    model.deleteMany({
      _id: {
        $in: items.map(({ id }) => id),
      },
    }),
    ...descendingValues
      .filter((v) => v)
      .map((value) => deleteCascade(model, cascadeField, value)),
  ]);

  return true;
}
