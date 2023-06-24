#include <stdio.h>
void main(){
	int n,m;
	printf("Enter no. of processes: ");
	scanf("%d",&n);
	printf("Enter no. of blocks: ");
	scanf("%d",&m);
	int p[n],b[m];
	int i,j;
	for (i=0;i<n;i++){
		printf("Enter process %d size: ",i+1);
		scanf("%d",&p[i]);
	}
	for (i=0;i<m;i++){
		printf("Enter block %d size: ",i+1);
		scanf("%d",&b[i]);
	}
	printf("Process  PSize  Block  BSize  WastageSpace\n");
	for (i=0;i<n;i++){
		for (j=0;j<m;j++){
			if (p[i]<b[j]){
				printf("P%d      %d     B%d     %d     %d\n",i+1,p[i],j,b[j],(b[j]-p[i]));
				b[j]=0;
				p[i]=0;
				break;
			}
		}
	}
	for (i=0;i<n;i++){
		if (p[i]!=0){
			printf("P%d couldnt get allocated\n",i+1);
		}
	}
}

				
