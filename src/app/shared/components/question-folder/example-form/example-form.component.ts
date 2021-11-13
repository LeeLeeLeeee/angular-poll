import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllowIn, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { Subscription } from 'rxjs';
import { checkDuplicatedValidator } from 'src/app/shared/validator/form-validator';

@Component({
	selector: 'app-example-form',
	templateUrl: './example-form.component.html',
	styleUrls: ['../form.component.scss'],
})
export class ExampleFormComponent implements OnInit, AfterViewInit, OnDestroy {
	exampleForm: FormGroup;
	shortcuts: ShortcutInput[] = [];
	@ViewChildren('exampleRef', { read: ElementRef }) exampleRef: QueryList<any>;
	subscribe: Subscription;
	currentIndex: number = 0;
	duplicatedList : number[] = []

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
		this.exampleForm = this.fb.group({
			item: this.fb.array([this.fb.control('')], [checkDuplicatedValidator()]),
		});

		this.shortcuts.push({
			key: 'ctrl + enter',
			allowIn: [AllowIn.Input],
			preventDefault: true,
			throttleTime: 100,
			command: (output: ShortcutEventOutput) => {
				let elementOrder: string | number = (output.event.target as HTMLInputElement).getAttribute('data-id');
				elementOrder = parseInt(elementOrder);
				this.currentIndex = elementOrder;
				this.insertNewExampleWithPlusIndex();
				this.cdr.detectChanges(); // 자동 변경 감지 수행
			},
		});
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.subscribe = this.exampleRef.changes.subscribe(this.focusExampleTargetToCurrentIndex.bind(this));
		this.exampleForm.statusChanges
			.subscribe((status) => {
				if(status === 'INVALID') {
					this.duplicatedList = this.exampleForm.get('item')
						.errors.duplicated
				} else {
					this.duplicatedList = []
				}
			})
	}

	ngOnDestroy(): void {
		this.subscribe.unsubscribe();
	}

	get items() {
		return this.exampleForm.get('item') as FormArray;
	}

	get exampleElementsArray() {
		return this.exampleRef.toArray();
	}


	getControlItemOfIndex(index) : AbstractControl {
		try {
			return this.items.controls[index]
		} catch(error) {
			throw new Error("Control item of the index doesn't exist")
		}
		
	}

	focusExampleTargetToCurrentIndex() {
		try {
			(this.exampleElementsArray[this.currentIndex] as ElementRef).nativeElement.focus();
		} catch(error) {
			console.log(error)
		}
	}

	insertNewExampleWithPlusIndex() {
		this.currentIndex += 1;
		this.insertExampleToIndex(this.currentIndex, this.fb.control(''));
	}

	insertExampleToIndex(index: number, target : AbstractControl = this.fb.control('')) {
		try {
			this.checkCurrentIndexLowerThanZero(index);
			this.checkCurrentIndexOverLength(index);
			this.items.insert(index, target);
		} catch(error) {
			console.log(error)
		}
		
	}

	deleteExample(index: number) {
		try {
			this.checkCurrentIndexLowerThanZero(index);
			this.checkCurrentIndexOverLength(index);
			this.checkExampleLengthGreaterThanOne();
			this.items.removeAt(index);
			this.setCurrentIndexAfterDelete(index);
		} catch(error) {
			console.log(error)
		}
			
		
	}

	setCurrentIndexAfterDelete(index: number) {
		try {
			this.checkCurrentIndexLowerThanZero(index);
			this.checkCurrentIndexOverLength(index);
			this.currentIndex = index;
		} catch(error) {
			this.currentIndex = 0;
		}					
	}

	changeOrderLower() {
		const TARGET_INDEX = this.currentIndex - 1;
		const DELETE_INDEX = this.currentIndex + 1;
		try {
			const target = this.getControlItemOfIndex(this.currentIndex);
			this.insertExampleToIndex(TARGET_INDEX, target);
			this.deleteExample(DELETE_INDEX);
		} catch(error) {
			console.log(error);
		}
	}

	changeOrderHigher() {
		const TARGET_INDEX = this.currentIndex + 2;
		const DELETE_INDEX = this.currentIndex;
		try {
			const target = this.getControlItemOfIndex(this.currentIndex);
			this.insertExampleToIndex(TARGET_INDEX, target);
			this.deleteExample(DELETE_INDEX);
		} catch(error) {
			console.log(error)
		}
	}

	checkCurrentIndexOverLength(index) : void {
		if(index >= this.items.length + 1) {
			throw new Error('Error of range')
		}
	}

	checkCurrentIndexLowerThanZero(index) : void {
		if(index < 0 ) {
			throw new Error('Error of range')
		}
	}

	checkExampleLengthGreaterThanOne() {
		if(this.items.length === 1) {
			throw new Error("this array doesn't be deleted");
		}
	}

	resetFormArray() {
		this.items.clear()
	}

	/* Event Handler */
	onClickLowerEvent(index: number) {
		this.currentIndex = index;
		this.changeOrderLower();
	}

	onClickHigherEvent(index: number) {
		this.currentIndex = index;
		this.changeOrderHigher();
	}

	onClickAddExampleEvent(index: number) {
		this.currentIndex = index;
		this.insertNewExampleWithPlusIndex();
	}

	onClickDeleteExampleEvent(index: number) {
		this.currentIndex = index;
		this.deleteExample(index);
	}

	onClickResetExample() {
		this.resetFormArray();
		this.insertExampleToIndex(0, this.fb.control(''));
	}
}
