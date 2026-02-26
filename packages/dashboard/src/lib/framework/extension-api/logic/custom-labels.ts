import { globalRegistry } from '../../registry/global-registry.js';
import { DashboardExtension } from '../extension-api-types.js';

globalRegistry.register('formLabels', new Map<string, string | React.ReactNode>());

export function registerCustomFormLabels(customFormLabels?: DashboardExtension['customFormLabels']) {
    const formLabels = globalRegistry.get('formLabels');

    if (customFormLabels) {
        for (const [key, component] of Object.entries(customFormLabels)) {
            if (formLabels.has(key)) {
                // eslint-disable-next-line no-console
                console.warn(`Form label with key "${key}" is already registered and will be overwritten.`);
            }
            formLabels.set(key, component);
        }
    }
}

export function getCustomFormLabel(id: string | undefined): string | React.ReactNode | undefined {
    if (!id) {
        return undefined;
    }
    const formLabel = globalRegistry.get('formLabels').get(id);
    return formLabel;
}
