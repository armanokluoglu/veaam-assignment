import React from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import { FormProvider } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FormField } from './components/FormField';
import { useFormGenerate } from './hooks/useFormGenerate';
import { FormGenerateButtonType } from './types/FormGenerate';

function FormGenerateApp() {
	const { form, onSubmit, configString, setConfigString, errorMessage, formMessage, onResetClick, onApplyClick, onClear, onClose } = useFormGenerate();
	return (
		<div className="App">
			<header className="App-header">
				<Tabs>
					<TabList>
						<Tab>Config</Tab>
						<Tab>Result</Tab>
					</TabList>
					<TabPanel>
						<div className="config-container">
							<textarea
								id="config"
								name="Config"
								rows={20}
								cols={40}
								value={configString}
								onChange={(event) => setConfigString(event.target.value)}
							/>
							{errorMessage && <p className='error-message'>{errorMessage}</p>}
							<div className="button-container">
								<button type='button' onClick={onResetClick}>Reset</button>
								<button type='button' onClick={onApplyClick}>Apply</button>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						<FormProvider {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<h3>{form.getValues() && form.getValues().title}</h3>
								<div className="form-container">
									{form.getValues().items && form.getValues().items.map((item, index) => {
										return (
											<FormField
												key={item.label + index}
												fieldName={`item.${index}`}
												item={item}
											/>
										)
									})}
									{formMessage && <p className='error-message'>{formMessage}</p>}
								</div>
								<div className="button-container">
									{form.getValues().buttons && form.getValues().buttons.map((button) => {
										return (
											<button
												key={button.label}
												type={button.type === FormGenerateButtonType.SUBMIT ? "submit" : "button"}
												onClick={() =>
													(button.type === FormGenerateButtonType.CLEAR && onClear()) ||
													(button.type === FormGenerateButtonType.CLOSE && onClose())
												}
											>
												{button.label}
											</button>
										)
									})}
								</div>
							</form>
						</FormProvider>
					</TabPanel>
				</Tabs>
			</header>
		</div>
	);
}

export default FormGenerateApp;
